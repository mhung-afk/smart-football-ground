export default class Error
{
    constructor() {
        this.errors = []
        this.checkRequire = true
    }

    /**
     * @param field : field to validate
     * @param name : default is param field's name
     * @returns this
     */
    isRequired(field, name) {
        if(field == null) this.errors.push(`${name} field is required.`)
        if(this.checkRequire)   this.checkRequire = false
        return this
    }

    isValidDate(field, name) {
        if(Date.parse(field) == NaN)
            this.errors.push(`${name} field is invalid date.`)
        return this
    }

    lengthWith(field, name, min = null, max = null) {
        if(!name) name = Object.keys({field})[0]
        // if(field.length)
    }

    appendError(message) {
        this.errors.push(message)
    }

    get() {
        return this.errors.length > 0 ? this.errors : null
    }
}