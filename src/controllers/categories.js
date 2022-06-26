const { read, write, changeCase, snakeToCamel, camelToSnake } = require("../utils/model")

const GET = (req, res, next) => {
    const { categoryId } = req.params
    let categories = read('categories')
    let subCategories = read('subCategories')

    categories = changeCase(snakeToCamel, categories, 'category_id', 'category_name')
    subCategories = changeCase(snakeToCamel, subCategories, "sub_category_id", "category_id", "sub_category_name")


    if(categoryId){
        categories = categories.filter(ctg => ctg.categoryId == categoryId)
    }


    res.status(200).json(categories.map(ctg => {
        ctg.subCategories = subCategories.filter(subCtg => {
            if(subCtg.categoryId == ctg.categoryId){
                delete subCtg.categoryId
                return subCtg
            }
        })
        return ctg
    }))
}


const POST = (req, res) => {
    let category = req.body
    let categories = read('categories')

    category.category_id = categories.at(-1).category_id + 1 || 1
    category = changeCase(camelToSnake, category, 'categoryName')
    categories.push(category)

    write('categories', categories)
    res.status(201).json({
        status: 201,
        message: 'successful added',
        category: changeCase(snakeToCamel, category, 'category_name', 'category_id')
    })
}


const PUT = (req, res) => {
    let { categoryId } = req.params
    let categories = read('categories')
    
    categories = changeCase(snakeToCamel, categories, 'category_id', 'category_name')
    
    categories = categories.map(ctg => {
        if(ctg.categoryId == categoryId) ctg = { ...ctg, ...req.body }
        return ctg
    })

    let data = categories.find(ctg => ctg.categoryId == categoryId)
    if(!data) return res.send([])

    categories = changeCase(camelToSnake, categories, 'categoryId', 'categoryName')

    write('categories', categories)
    res.status(201).json({
        status: 201,
        message: 'successful changet',
        category: changeCase(snakeToCamel, data, 'category_id', 'category_name')
    })
}


const DELETE = (req, res) => {
    let { categoryId } = req.params
    let categories = read('categories')

    let data = categories.find(ctg => ctg.category_id != categoryId)
    if(!data) return res.send([])

    categories = categories.filter(ctg => ctg.category_id != categoryId)
    write('categories', categories)

    res.send({
        status: 204,
        message: "successful deleted"
    })
}


module.exports = {
    GET,
    POST,
    PUT,
    DELETE
}