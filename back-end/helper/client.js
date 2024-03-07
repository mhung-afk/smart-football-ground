import { curly } from "node-libcurl"

export const sendSuccess = (res, message, data = null) => {
    let responseJson = {
        success: true,
        message: message
    }
    if(data) responseJson.data = data
    return res.status(200).json(responseJson)
}

export const sendError = (res, message, code = 400) => {
    return res.status(code).json({
        success: false,
        message: message
    })
}

export const sendServerError = res => 
    res.status(500).json({
        success: false,
        message: 'Server Interval Error.'
    })

/**
 * 
 * @param {*} url 
 * @param {*} method 
 * @param {*} headers : array string ['Authorzied: Bearer token']
 * @param {*} data : object
 */
export const sendRequest = async (url, method, headers = [], postData = {}) => {
    const dataJSON = JSON.stringify(postData)
    const config = {
        customRequest: method,
        httpHeader: headers,
        postFields: dataJSON
    }
    const { statusCode, data } = await curly(url, config)
    return { statusCode, data }
}
