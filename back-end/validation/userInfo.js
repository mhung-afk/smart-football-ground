import Error from "../helper/error.js"

export const userInfoValidate = data => {
    const error = new Error()
    error.isRequired(data.name, "name")
    return error.get()
}

