const { read, write, changeCase, snakeToCamel, camelToSnake } = require("../utils/model")


const GET = (req, res, next) => {
    const { subCategoryId } = req.params
    let subCategories = read('subCategories')
    let products = read('products')

    subCategories = changeCase(snakeToCamel, subCategories, "sub_category_id", "sub_category_name", "category_id")
    products = changeCase(snakeToCamel, products, 'product_id', 'product_name', "sub_category_id")

    if(subCategoryId){
        subCategories = subCategories.filter(subCtg => subCtg.subCategoryId == subCategoryId)
    }

    res.status(200).json(subCategories.map(subCtg => {
        subCtg.products = products.filter(product => {
            if(product.subCategoryId == subCtg.subCategoryId){
                delete product.sub_category_id
                return product
            }
        })
        return subCtg
    }))
}


const POST = (req, res) => {
    let subCategories = read('subCategories')
    let subCategory = req.body

    subCategory.sub_category_id = subCategories.at(-1).sub_category_id + 1 || 1
    subCategory = changeCase(camelToSnake, subCategory, 'categoryId', 'subCategoryName', )

    subCategories.push(subCategory)
    write('subCategories', subCategories)

    res.status(201).json({
        status: 201,
        message: 'successful added',
        subCategory : changeCase(snakeToCamel, subCategory, 'category_id', 'sub_category_name', 'sub_category_id')
    })
}


const DELETE = (req, res) => {
    let { subCategoryId } = req.params
    let subCategories = read('subCategories')

    let data = subCategories.find(ctg => ctg.sub_category_id != subCategoryId)
    if(!data) return res.send([])

    subCategories = subCategories.filter(ctg => ctg.sub_category_id != subCategoryId)
    write('subCategories', subCategories)

    res.send({
        status: 204,
        message: "successful deleted"
    })
}


const PUT = (req, res) => {
    let { subCategoryId } = req.params
    let subCategories = read('subCategories')
    
    subCategories = changeCase(snakeToCamel, subCategories, 'sub_category_id', "sub_category_name", 'category_id')
    
    subCategories = subCategories.map(ctg => {
        if(ctg.subCategoryId == subCategoryId) ctg = {...ctg, ...req.body}
        return ctg
    })
    
    let data = subCategories.find(ctg => ctg.subCategoryId == subCategoryId)
    if(!data) return res.send([])

    subCategories = changeCase(camelToSnake, subCategories, 'categoryId', 'subCategoryName', 'subCategoryId')
    write('subCategories', subCategories)

    res.status(201).json({
        status: 201,
        message: 'successful changet',
        category: changeCase(snakeToCamel, data, 'sub_category_id', "sub_category_name", 'category_id')
    })
}


module.exports = {
    GET,
    POST,
    DELETE,
    PUT
}