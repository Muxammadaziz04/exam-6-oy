const express = require('express')

const { LOGIN, REGISTER } = require('../controllers/users')


const router = express.Router()


router.post('/login', LOGIN)
router.post('/register', REGISTER)

module.exports = router 