const jwt = require('jsonwebtoken')

const { secretKey } = require('../config/config')
const { AuthorizationError } = require('../utils/errors')


function checkToken(req, res, next){
    try {
        if(req.url == '/login' || req.url == '/register' || req.method == 'GET') return next()

        let token = req.headers.token
        if(!token) throw new AuthorizationError(400, 'token yoq')

        token = jwt.verify(token, secretKey)
        next()

    } catch (error) {
        next(error)
    }
}

module.exports = checkToken