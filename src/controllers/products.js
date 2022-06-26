const { read, write, changeCase, snakeToCamel, camelToSnake } = require('../utils/model')

const GET = (req, res) => {
    let { productId } = req.params
    const { categoryId, subCategoryId, model, color } = req.query

    if(!categoryId && !subCategoryId && !model && !color && !productId) return res.send([])

    let subCategories = read('subCategories')
    let products = read('products')

    products = changeCase(snakeToCamel, products, 'product_id', 'product_name', 'sub_category_id')
    subCategories = changeCase(snakeToCamel, subCategories, 'sub_category_id', 'category_id', 'sub_category_name')


    if(productId) return res.status(200).json(products.filter(product => product.productId == productId))


    if(categoryId){
        subCategories = subCategories.filter(subCtg => subCtg.categoryId == categoryId)
        let data = subCategories.reduce((prev, curr) => { return [...prev, products.filter(product => curr.subCategoryId == product.subCategoryId)]}, [])
        res.status(200).send(data.flat(3))
    }

    let data = products.filter(product => {
        let bySubCategoryId = subCategoryId ? product.subCategoryId == subCategoryId : true
        let byModel = model ? product.model.toLowerCase() == model.toLowerCase() : true
        let byColor = color ? product.color.toLowerCase() == color.toLowerCase() : true

        return bySubCategoryId && byModel && byColor
    })

    res.status(200).json(data)
}



const POST = (req, res) => {
    let products = read('products')
    let product = req.body

    product.product_id = products.at(-1).product_id + 1 || 1
    product = changeCase(camelToSnake, product, 'productName', 'subCategoryId')

    products.push(product)
    write('products', products)

    res.status(201).json({
        status: 201,
        message: 'successful added',
        product: changeCase(snakeToCamel, product, 'product_name', 'product_id', 'sub_category_id')
    })
}

const DELETE = (req, res) => {
    let { productId } = req.params
    let products = read('products')

    let data = products.find(product => product.product_id == productId)
    if(!data) return res.send([])

    products = products.filter(product => product.product_id != productId)
    write('products', products)


    res.send({
        status: 204,
        message: 'successful deleted'
    })
}


const PUT = (req, res) => {
    let { productId } = req.params
    let products = read('products')
    
    products = changeCase(snakeToCamel, products, 'product_id', 'product_name', 'sub_category_id')
    
    products = products.map(product => {
        if(product.productId == productId) product = {...product, ...req.body}
        return product
    })
    
    let data = products.find(product => product.productId == productId)
    if(!data) return res.send([])

    products = changeCase(camelToSnake, products, 'productId', 'productName', 'subCategoryId')

    write('products', products)
    res.status(201).json({
        status: 201,
        message: 'successful changet',
        category: changeCase(snakeToCamel, data, 'product_id', 'product_name', 'sub_category_id')
    })
}



module.exports = {
    GET,
    POST,
    PUT,
    DELETE
}