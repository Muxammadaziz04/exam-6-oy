const express = require('express')
const { GET, POST, PUT, DELETE } = require('../controllers/products')

const router = express.Router()

router.get('/products', GET)
router.get('/products/:productId', GET)
router.post('/products', POST)
router.put('/products/:productId', PUT)
router.delete('/products/:productId', DELETE)

module.exports = router