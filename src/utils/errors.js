class ValidationError extends Error{
    constructor(status, message){
        super()
        this.status = status,
        this.message = message
    }
}

class AuthorizationError extends Error{
    constructor(status, message){
        super()
        this.status = status,
        this.message = message
    }
}


module.exports = {
    ValidationError,
    AuthorizationError
}