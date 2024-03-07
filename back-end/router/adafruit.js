import express from "express"
import io from "socket.io-client"
import { sendError, sendServerError, sendSuccess, sendRequest } from "../helper/client.js"
import { verifyToken, verifyUserManager } from "../middleware/index.js"
import { adafruitCreateRequest, adafruitGetRequest } from "../validation/adafruit.js"
import { mapDeviceAdafruit } from "../constant.js"
import ProductIndex from "../model/ProductIndex.js"

const adafruitRoute = express.Router()

/**
 * @route /api/adafruit/create
 * @description affect to device
 * @access private
 */
adafruitRoute.post('/create', verifyToken, verifyUserManager, async (req, res) => {
    const errors = adafruitCreateRequest(req.body)
    if(errors)
        return sendError(res, errors)

    const { productId, value, device } = req.body
    const feedId = mapDeviceAdafruit[device]
    if(!feedId) {
        return sendError(res, 'Device not found.')
    }

    try {
        let updateQuery = {}
        updateQuery[device] = value

        const check = await ProductIndex.findByIdAndUpdate(productId, updateQuery)
        if(!check) {
            return sendError(res, 'Product not found.')
        }

        const headers = [
            'Content-Type: application/json',
            `X-AIO-Key: ${process.env.ADAFRUIT_TOKEN}`
        ]
        const data = {value: `${productId}-${value}`}

        await sendRequest(`${process.env.ADAFRUIT_URL}/${process.env.ADAFRUIT_NAME}/feeds/${feedId}/data`, "POST", headers, data)
        return sendSuccess(res, `Send data to microbit device ${device} successfully.`, {
            productId, value, device
        })
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})

/**
 * @route POST /api/adafruit/socket-io/send-data
 * @description send data from gateway to socket io server & update to database
 * @access private
 */
adafruitRoute.post('/socket-io/send-data', verifyToken, verifyUserManager, async (req, res) => {
    const errors = adafruitCreateRequest(req.body)
    if(errors)
        return sendError(res, errors)
    const { productId, value, device } = req.body
    console.log(productId)
    const feedId = mapDeviceAdafruit[device]
    if(!feedId) {
        return sendError(res, 'Device not found.')
    }

    try {
        let updateQuery = {}
        updateQuery[device] = value
        const check = await ProductIndex.findByIdAndUpdate(productId, updateQuery)
        if(!check)
            return sendError(res, 'Product not found.')

        const socket = io.connect(process.env.SOCKET_IO_URL, { reconnect: true })
        socket.emit("send-data-device", productId, updateQuery)

        return sendSuccess(res, `Send data to socket server successfully.`, {
            productId, value, device
        })
    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
})

export default adafruitRoute