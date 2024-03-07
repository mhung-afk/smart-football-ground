import Error from "../helper/error.js"

export const productCreateValidate = data => {
    const error = new Error()
    error.isRequired(data.name, "name")
    .isRequired(data.address, "address")
    .isRequired(data.slot, "slot")
    .isRequired(data.ward, 'ward')
    .isRequired(data.district, 'district')

    return error.get()
}

export const productIndexAppendValidate = data => {
    const error = new Error()
    error.isRequired(data.name, 'name')
    
    return error.get()
}

export const productIndexEditValidate = data => {
    const error = new Error()
    error.isRequired(data.name, 'name')
    
    return error.get()
}

export const productCheckAvailableSlot = data => {
    const error = new Error()
    error.isRequired(data.date, 'date')
    error.isValidDate(data.data, 'date')
    error.isRequired(data.slot, 'slot')
    
}