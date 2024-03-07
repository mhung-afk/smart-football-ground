import Error from "../helper/error.js"

export const userRegisterValidate = data => {
    const error = new Error()

    error.isRequired(data.name, "name")
    .isRequired(data.email, "email")
    .isRequired(data.password, "password")
    .isRequired(data.verify_password, "verify_password")
    
    if(error.get()) return error.errors
    if(data.password != data.verify_password)
        error.appendError('confirm password does not match password.')

    return error.get()
}

export const userLoginValidate = data => {
    const error = new Error()

    error.isRequired(data.email, "email")
    .isRequired(data.password, "password")
    return error.get()
}