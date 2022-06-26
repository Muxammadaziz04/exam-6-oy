const express = require('express')
const { GET, POST, PUT, DELETE } = require('../controllers/categories')

const router = express.Router()

router.get('/categories/:categoryId', GET)
router.get('/categories', GET)
router.post('/categories', POST)
router.put('/categories/:categoryId', PUT)
router.delete('/categories/:categoryId', DELETE)

module.exports = router