import express from "express"
import Ticket from "../model/Ticket.js"
import ProductIndex from "../model/ProductIndex.js"
import Product from "../model/Product.js"
import MatchInfo from "../model/MatchInfo.js"
import { verifyToken, verifyUserManager } from "../middleware/index.js"
import { ticketCreateValidate } from "../validation/ticket.js"
import { sendError, sendRequest, sendServerError, sendSuccess } from "../helper/client.js"
import { convertToCronExpression } from "../helper/date.js"
import { generateRandomString } from "../helper/str.js"
import { scheduleJob } from "node-schedule"
import { handleProductData } from "../helper/index.js"
import SharingMatchInfo from "../model/SharingMatchInfo.js"

const ticketRoute = express.Router()

/**
 * @route GET /api/tickets/:ticketId
 * @description get a ticket
 * @access private
 */
ticketRoute.get('/:ticketId', verifyToken, async (req, res) => {
    const { ticketId } = req.params
    try {
        const ticket = await Ticket.findOne({ _id: ticketId })
        .populate('match_info_id')
        .populate({
            path: 'product_index_id',
            populate: {path: 'productId'}
        })

        if (ticket) {
            let newTicket = ticket.toObject()
            newTicket.product_index_id = handleProductData(newTicket.product_index_id)
            return sendSuccess(res, 'Retrieved successfully.', newTicket)
        }
        return sendError(res, 'ticket have been not found.')
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})

/**
 * @route GET /api/tickets
 * @description get list tickets
 * @access private
 */
ticketRoute.get('/', verifyToken, verifyUserManager, async (req, res) => {
    let filter = req.query
    try {
        var fil = {}
        if (filter.status) fil = {status:filter.status}
        var tickets = await Ticket.find(fil)
        .populate('product_index_id')
        .populate({
            path: 'product_index_id',
            populate: 'productId'
        })
        tickets = tickets.filter((ticket, index)=>{
            if(filter.ward){
                if(ticket.product_index_id.productId.ward!=filter.ward)
                    return false
            }
            if(filter.district){
                if(ticket.product_index_id.productId.district!=filter.district)
                    return false
            }
            return true
        })
        return sendSuccess(res, 'Retrieved successfully.', tickets)
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})

/**
 * @route POST /api/tickets/create
 * @description create new ticket
 * @access public
 */
ticketRoute.post('/create', verifyToken,
    async (req, res) => {
        const errors = ticketCreateValidate(req.body)
        if (errors) {
            return sendError(res, errors)
        }

        const { timeStart, dateStart, price, username, user_phone, product_index_id } = req.body

        try {
            var checkProductIdx = await ProductIndex.exists({ _id: product_index_id })
            if (!checkProductIdx)
                return sendError(res, "not exist the field.")

            var checkSlot = await Ticket.exists({timeStart, dateStart, product_index_id})
            if (!checkSlot) {
                const cronExpression = convertToCronExpression(timeStart, dateStart)
                const code = generateRandomString()
                const user_id = req.userId

                let match_info = await MatchInfo.create({})

                var checkSharingLst = await SharingMatchInfo.exists({user:user_id})
                if(!checkSharingLst)
                    await SharingMatchInfo.create({user:user_id, matchs: [match_info]})
                else
                    await SharingMatchInfo.findOneAndUpdate({user:user_id}, {$push: {matchs: match_info}})

                let ticket = await Ticket.create({ timeStart, dateStart, price, username, user_phone, product_index_id, user_id, code, match_info_id: match_info })
                const product = await ProductIndex.findById(product_index_id).populate('productId')
                ticket.product_index_id = product

                scheduleJob(cronExpression, async () => {
                    const headers = [
                        'Content-Type: application/json',
                        `X-AIO-Key: ${process.env.ADAFRUIT_TOKEN}`
                    ]
                    const data = {value: code}
                    await sendRequest(`${process.env.ADAFRUIT_URL}/${process.env.ADAFRUIT_NAME}/feeds/sas-door/data`, "POST", headers, data)
                })
                return sendSuccess(res, 'create new ticket successfully.', ticket)
            }
            return sendError(res, "the field have been booked.")
        } catch (error) {
            console.log(error)
            return sendServerError(res)
        }
    }
)

/**
 * @route POST /api/tickets/:ticketId/edit
 * @description edit a ticket for customer
 * @access private
 */
ticketRoute.post('/:ticketId/edit', verifyToken,
    async (req, res) => {
        const { ticketId } = req.params
        const { status } = req.body

        try {
            const ticket = await Ticket.exists({ _id: ticketId })
            if (ticket) {
                await Ticket.findOneAndUpdate({ _id: ticketId }, { status: status })
                return sendSuccess(res, 'edit ticket successfully.')
            }
            return sendError(res, 'ticket have been not found.')
        } catch (error) {
            console.log(error)
            return sendServerError(res)
        }
    }
)

/**
 * @route GET /api/tickets/matchs/:matchId
 * @description get a match
 * @access private
 */
ticketRoute.get('/matchs/:matchId', verifyToken, async (req, res) => {
    const { matchId } = req.params

    try {
        const ticket = await MatchInfo.findOne({ _id: matchId })
        if (ticket)
            return sendSuccess(res, 'Retrieved successfully.', ticket)
        return sendError(res, 'information of this match have been not found.')
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})

export default ticketRoute