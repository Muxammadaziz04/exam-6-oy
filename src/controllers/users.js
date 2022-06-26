const path = require('path')
const jwt = require('jsonwebtoken')

const { AuthorizationError } = require('../utils/errors')
const { read, write } = require('../utils/model')
const { secretKey } = require('../config/config')


const LOGIN = (req, res, next) => {
    try {
        const { username, password } = req.body
        const users = read('users')
        
        const user = users.find(user => user.username == username && user.password == password)

        if(!user) throw new AuthorizationError(401, 'wrong username or password')
        
        delete user.password

        res.status(200).send({
            status : 200,
            message : 'successful logined',
            token : jwt.sign({ userId : user.userId }, secretKey),
            user : user
        })
    } catch (error) {
        next(error)
    }
}


const REGISTER = (req, res, next) => {
    let user = req.body
    let users = read('users')

    user.user_id = users.at(-1).user_id + 1 || 1

    users.push(user)
    user.password = user.password
    write('users', users)

    delete user.password
    
    res.status(201).send({
        status : 201,
        message: 'successful registered',
        token : jwt.sign({ user_id : user.user_id }, secretKey),
        user
    })
}


module.exports = {
    LOGIN,
    REGISTER
}