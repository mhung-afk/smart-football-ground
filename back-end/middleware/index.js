import jwt from "jsonwebtoken"
import User from "../model/User.js"
import { mkdir } from "fs"
import { sendError, sendServerError } from "../helper/client.js"

/**
 * 
 */
export const createUploadDir = (req, res, next) => {
    const d = new Date()
    const dirName = d.toISOString().slice(0,7)
    mkdir(`public/uploads/${dirName}`, { recursive: true }, (err) => {
        if(err) return sendError(res, 'Cannot upload file.')
    })
    req.dirName = dirName
    next()
}

/**
 * header contain
 * Authorised : Bearer token
 */
export const verifyToken = async (req, res, next) => {
    const data = req.headers['authorization']
    const token = data?.split(" ")[1];
    try {
        const { payload } = jwt.verify(token, process.env.JWT_SECRET_KEY, {
            complete: true
        })
        const user = await User.findById(payload.user.id)
        
        //  Forbidden
        if(!user) return sendError(res, "Unauthorized.", 401)

        req.userId = user._id
        req.user_type = user.user_type
        req.name = user.name
        next()

    } catch (error) {
        console.log(error)
        return sendServerError(res)
    }
}

/**
 * check user is customer
 * This middleware should be after verifytoken middleware
 */
 export const verifyUserCustomer = (req, res, next) => {
    const { user_type } = req

    if(user_type != 'customer') return sendError(res, "Unauthorized.", 401)
    next()
}

/**
 * check user is manager
 * This middleware should be after verifytoken middleware
 */
export const verifyUserManager = (req, res, next) => {
    const { user_type } = req

    if(user_type != 'manager') return sendError(res, "Unauthorized.", 401)
    next()
}

/**
 * check user is admin
 * This middleware should be after verifytoken middleware
 */
 export const verifyUserAdmin = (req, res, next) => {
    const { user_type } = req

    if(user_type != 'admin') return sendError(res, "Unauthorized.", 401)
    next()
}

/**
 * check user is not customer?
 * This middleware should be after verifytoken middleware
 */
 export const verifyUserIsNotCustomer = (req, res, next) => {
    const { user_type } = req

    if(user_type != 'admin' && user_type != 'manager') return sendError(res, "Unauthorized.", 401)
    next()
}