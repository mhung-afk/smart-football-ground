import Error from "../helper/error.js"

export const adafruitCreateRequest = data => {
    const error = new Error()

    error.isRequired(data.productId, "productId")
    error.isRequired(data.value, "value")
    error.isRequired(data.device, "device")
    return error.get()
}

export const adafruitGetRequest = data => {
    const error = new Error()

    error.isRequired(data.productId, "productID")
    error.isRequired(data.device, "device")
    return error.get()
}