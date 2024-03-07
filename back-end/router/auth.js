import express from "express"
import jwt from "jsonwebtoken"
import argon2 from "argon2"
import User from "../model/User.js"
import { userLoginValidate, userRegisterValidate } from "../validation/auth.js"
import { sendError, sendSuccess } from "../helper/client.js"

const authRoute = express.Router()

/**
 * @route POST /api/auth/verify-token
 * @description verify user with access token
 * @access public
 */
authRoute.post('/verify-token', (req, res) => {
    const { token } = req.body
    try {
        const { payload } = jwt.verify(token, process.env.JWT_SECRET_KEY, {
            complete: true
        })
        return sendSuccess(res, "Verify token successfully.", {
            user: payload.user
        })
    } catch (error) {
        
        return sendError(res, "Unauthorzied.", 400)
    }
    
})

/**
 * @route POST /api/auth/register
 * @description customer register
 * @access public
 */
authRoute.post('/register', async (req, res) => {
    const errors = userRegisterValidate(req.body)
    if(errors)
        return res.status(400).json({
            success: false,
            message: errors
        })

    let { name, email, password, verify_password, phone } = req.body

    const userCheck = await User.findOne({ email })
    if(userCheck)
        return res.status(400).json({
            success: false,
            message: 'user is exist.'
        })

    try {
        password = await argon2.hash(password)
        await User.create({
            name, email, password, phone
        })
    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: 'Server Internal Error.'
        })
    }

    return res.status(200).json({
        success: true,
        message: 'user register successfully.'
    })
})

/**
 * @route POST /api/auth/login
 * @description customer login
 * @access public
 */
authRoute.post('/login', async (req, res) => {
    const errors = userLoginValidate(req.body)
    if(errors)
        return res.status(400).json({
            success: false,
            message: errors
        })
        
    let { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        let success = true

        if(!user) success = false
        else {
            const passwordValid = await argon2.verify(user.password, password)
            if(!passwordValid) success = false
        }

        if(!success)
            return res.status(400).json({
                success: false,
                message: 'email or password is wrong.'
            })

        const userData = {
            id: user._id,
            name: user.name,
            avatar: user.avatar,
            user_type: user.user_type
        }
        const accessToken = jwt.sign({
            user: userData
        }, process.env.JWT_SECRET_KEY)
        return res.status(200).json({
            success: true,
            message: 'Login successfully.',
            data: {
                token: accessToken,
                user: userData
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Internal Error.'
        })        
    }
})

export default authRoute
