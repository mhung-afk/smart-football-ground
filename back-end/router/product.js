import express from "express"
import { createUploadDir, verifyToken, verifyUserIsNotCustomer, verifyUserManager } from "../middleware/index.js"
import { productIndexAppendValidate, productIndexEditValidate, productCreateValidate, productCheckAvailableSlot } from "../validation/product.js"
import Product from "../model/Product.js"
import ProductIndex from "../model/ProductIndex.js"
import { upload } from "../constant.js"
import { unlinkSync } from "fs"
import { sendError, sendServerError, sendSuccess } from "../helper/client.js"
import Ticket from "../model/Ticket.js"
import { handleProductData } from "../helper/index.js"

const productRoute = express.Router()

/**
 * @route GET /api/products
 * @description get list products
 * @access public
 */
productRoute.get('/', async (req, res) => {
    let query = {}
    const { district, ward } = req.query
    if(district)    query.district = district
    if(ward)    query.ward = ward

    // console.log(query)
    const page = req.query.page ?? 1
    const limit = (district || ward) ? 50 : req.query.limit ?? 8
    try {
        let products = await ProductIndex.find()
                                .populate({path: 'productId', match: query})
                                .limit(limit)
                                .skip(limit * (page - 1))
        if(district || ward) {
            const newLimit = req.query.limit ?? 8
            products = products.filter(product => product.productId != null)
            products = products.slice(newLimit * (page - 1), newLimit * page)
        }
        products = products.map(handleProductData)
        return sendSuccess(res, 'Retrieved successfully.', products)
    } catch (error) {
        return sendServerError(res)
    }
})

/**
 * @route GET /api/products/:productId/get-all-index
 * @description get all product indexes of one product
 * @access public
 */
 productRoute.get('/:productId/get-all-index', async (req, res) => {
    const productId = req.params.productId
    try {
        let productIndexes = await ProductIndex.find({productId:productId}).populate('productId')
        productIndexes = productIndexes.map(handleProductData)
        return sendSuccess(res, 'Retrieved successfully.', productIndexes)
    } catch (error) {
        return sendServerError(res)
    }
})


/**
 * @route GET /api/products/districts
 * @description get districts of list products
 * @access private
 */
productRoute.get('/districts', verifyToken, verifyUserManager, async (req, res) => {
    try {
        let districts = await Product.find({}, { _id: 0, district: 1 })
        districts = districts.map((value) => value.district)
            .filter((value, index, self) => self.indexOf(value) == index)
        return sendSuccess(res, 'Retrieved successfully.', districts)
    } catch (error) {
        return sendServerError(res)
    }
})

/**
 * @route GET /api/products/wards
 * @description get wards of a district of list products
 * @access private
 */
 productRoute.get('/wards', verifyToken, verifyUserManager, async (req, res) => {
    const district = req.query.district
    try {
        let wards = await Product.find({district:district}, { _id: 0, ward: 1 })
        wards = wards.map((value) => value.ward)
            .filter((value, index, self) => self.indexOf(value) == index)
        return sendSuccess(res, 'Retrieved successfully.', wards)
    } catch (error) {
        return sendServerError(res)
    }
})

/**
 * @route GET /api/products/all
 * @description get all products
 * @access public
 */
 productRoute.get('/all', async (req, res) => {
    const district = req.query.district
    try {
        var products
        if(district)
            products = await Product.find({district:district})
        else
        products = await Product.find({})
        return sendSuccess(res, 'Retrieved successfully.', products)
    } catch (error) {
        return sendServerError(res)
    }
})

/**
 * @route GET /api/products/:productId/detail
 * @description get detail product
 * @access public
 */
 productRoute.get('/:productId/detail', async (req, res) => {
    const { productId } = req.params
    try {
        const product = await Product.findOne({ _id: productId })
        const product_indexes = await ProductIndex.find({ productId: productId})
        return sendSuccess(res, 'Retrieved successfully.', {product, product_indexes})
    } catch (error) {
        return sendServerError(res)
    }
})

/**
 * @route GET /api/products/:productId
 * @description get detail product
 * @access public
 */
productRoute.get('/:productId', async (req, res) => {
    const { productId } = req.params
    try {
        let product = await ProductIndex.findById(productId).populate('productId')
        product = handleProductData(product)
        // console.log(product)
        return sendSuccess(res, 'Retrieved successfully.', product)
    } catch (error) {
        return sendServerError(res)
    }
})

/**
 * @route GET /api/products/images/:dirName/:imageName
 * @description get image of product
 * @access public
 */
 productRoute.get('/images/:dirName/:imageName', async (req, res) => {
    const { dirName, imageName } = req.params
    try {
        res.download(`../back-end/public/uploads/${dirName}/${imageName}`)
    } catch (error) {
        return sendServerError(res)
    }
})

/**
 * @route POST /api/products/:productId/check-slot
 * @description check slot available of product
 * @access public
 */
productRoute.post('/:productId/check-slot', async (req, res) => {
    const errors = productCheckAvailableSlot(req.body)
    if (errors) return sendError(res, errors)

    const { productId } = req.params
    let { slot, date } = req.body
    try {
        let dateStart = new Date(date)
        const tickets = await Ticket.find({
            dateStart: dateStart, product_index_id: productId, status: {
                $in: ['pending', 'completed']
            }
        }, 'timeStart')
        const checkIsEmpty = time => {
            for (let ticket of tickets)
                if (ticket.timeStart == time)
                    return false
            return true
        }

        if (Array.isArray(slot))
            slot = slot.map(e => {
                e.isEmpty = checkIsEmpty(e.timeStart)
                e.date = date
                return e
            })
        else {
            slot.date = date
            slot.isEmpty = checkIsEmpty(slot.timeStart)
        }
        return sendSuccess(res, 'Check slot is empty successfully.', slot)
    } catch (error) {
        return sendServerError(res)
    }
})

/**
 * @route POST /api/products/create
 * @description create new product
 * @access private
 */
productRoute.post('/create', verifyToken, verifyUserManager,
    createUploadDir, upload.single('image'),
    async (req, res) => {
        const errors = productCreateValidate(req.body)
        if (errors) {
            if (req.file) unlinkSync(req.file.path)
            return sendError(res, errors)
        }

        var image
        if(process.platform==='win32')
            image = req.file ? req.file.path.split("\\").slice(1).join("/") : null
        else
            image = req.file ? req.file.path.split("/").slice(1).join("/") : null

        const { name, address, district, ward } = req.body
        let slot = req.body.slot
        if (typeof slot === 'string') slot = JSON.parse(req.body.slot)
        try {
            var check = await Product.exists({ name: name })
            if (check == null) {
                // console.log({ name: name, address: address, ward: ward, district: district, slot: slot })
                var dataCreated = await Product.create({ name: name, address: address, ward: ward, district: district, slot: slot, image: image })
                return sendSuccess(res, 'create new product successfully.', dataCreated)
            }
            if (req.file) unlinkSync(req.file.path)
            return sendError(res, "product's name had existed.")
        } catch (error) {
            if (req.file) unlinkSync(req.file.path)
            return sendServerError(res)
        }
    }
)

/**
 * @route POST /api/products/:productId/edit
 * @description edit a product
 * @access private
 */
productRoute.post('/:productId/edit', verifyToken, verifyUserManager,
    createUploadDir, upload.single('image'),
    async (req, res) => {
        const errors = productCreateValidate(req.body)
        if (errors) {
            if (req.file) unlinkSync(req.file.path)
            return sendError(res, errors)
        }
        var image
        if(process.platform==='win32')
            image = req.file ? req.file.path.split("\\").slice(1).join("/") : null
        else
            image = req.file ? req.file.path.split("/").slice(1).join("/") : null
        const { productId } = req.params
        const { name, address, ward, district } = req.body
        let slot = req.body.slot
        if (typeof slot === 'string') slot = JSON.parse(req.body.slot)
        try {
            var product = await Product.findOneAndUpdate({ _id: productId }, { name: name, address: address, ward:ward, district:district, image: image, slot: slot })
            // console.log(product)
            if (product != null) {
                return sendSuccess(res, 'edit a product successfully.')
            }
            if (req.file) unlinkSync(req.file.path)
            return sendError(res, 'can not edit product.')
        } catch (error) {
            if (req.file) unlinkSync(req.file.path)
            return sendServerError(res)
        }
    }
)

/**
 * @route DELETE /api/products/:productId/delete
 * @description delete a product
 * @access private
 */
productRoute.delete('/:productId/delete', verifyToken, verifyUserManager,
    async (req, res) => {
        const { productId } = req.params
        try {
            var product = await Product.findOneAndRemove({ _id: productId })
            if (product != null) {
                return sendSuccess(res, 'delete a product successfully.')
            }
            return sendError(res, 'cannot find this product')
        } catch (error) {
            return sendServerError(res)
        }
    }
)

/**
 * @route POST /api/products/:productId/append
 * @description Append a product_index for product
 * @access private
 */
productRoute.post('/:productId/append', verifyToken, verifyUserManager, async (req, res) => {
    const errors = productIndexAppendValidate(req.body)
    if (errors) return sendError(res, errors)

    const { productId } = req.params
    const { name } = req.body
    try {
        var checkPro = await Product.exists({ _id: productId })
        if (checkPro) {
            var check = await ProductIndex.exists({ productId: productId, name: name })
            if (check == null) {
                await ProductIndex.create({ name, productId })
                return sendSuccess(res, 'Append index product successfully.')
            }
            return sendError(res, 'product index\'s name have existed.')
        }
        return sendError(res, 'cannot find this product')
    } catch (error) {
        return sendServerError(res)
    }
})

/**
 * @route POST /api/products/:productId/:idxId/edit
 * @description Edit product_index for product
 * @access private
 */
productRoute.post('/:productId/:idxId/edit', verifyToken, verifyUserManager, async (req, res) => {
    const errors = productIndexEditValidate(req.body)
    if (errors) return sendError(res, errors)

    const { productId, idxId } = req.params
    const { name } = req.body
    try {
        var checkPro = await Product.exists({ _id: productId })
        if (checkPro) {
            var check = await ProductIndex.exists({ productId: productId, name: name })
            if (check == null) {
                await ProductIndex.findOneAndUpdate({ _id: idxId }, { name: name })
                return sendSuccess(res, 'Edit name index product successfully.')
            }
            return sendError(res, 'product index have existed.')
        }
        return sendError(res, 'cannot find this product')
    } catch (error) {
        return sendServerError(res)
    }
})

/**
 * @route DELETE /api/products/:productId/delete
 * @description Delete product_index for product
 * @access private
 */
productRoute.delete('/:productId/:idxId/delete', verifyToken, verifyUserManager, async (req, res) => {
    const { productId, idxId } = req.params
    try {
        var checkPro = await Product.exists({ _id: productId })
        if (checkPro) {
            await ProductIndex.findOneAndRemove({ _id: idxId })
            return sendSuccess(res, 'Delete index product successfully.')
        }
        return sendError(res, 'cannot find this product')
    } catch (error) {
        return sendServerError(res)
    }
})

export default productRoute