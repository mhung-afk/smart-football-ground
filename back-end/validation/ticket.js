import Error from "../helper/error.js"

export const ticketCreateValidate = data => {
    const error = new Error()
    error.isRequired(data.timeStart, "timeStart")
    .isRequired(data.dateStart, "dateStart")
    .isRequired(data.price, "price")
    .isRequired(data.username, "username")
    .isRequired(data.user_phone, "user_phone")
    .isRequired(data.product_index_id, "product_index_id")

    return error.get()
}