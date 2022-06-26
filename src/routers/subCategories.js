const express = require('express')
const { GET, POST, PUT, DELETE } = require('../controllers/subCategories')

const router = express.Router()

router.get('/subcategories/:subCategoryId', GET)
router.get('/subcategories', GET)
router.post('/subcategories', POST)
router.put('/subcategories/:subCategoryId', PUT)
router.delete('/subcategories/:subCategoryId', DELETE)

module.exports = router