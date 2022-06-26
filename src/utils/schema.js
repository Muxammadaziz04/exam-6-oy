const Joi = require('joi')

const LoginSchema = Joi.object({
    username : Joi.string().min(2).required(),
    password: Joi.string().min(8).required()
})

const RegisterSchema = Joi.object({
    username : Joi.string().min(2).required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().pattern(new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')).required()
})

const CategoriesSchema = Joi.object({
    categoryName: Joi.string().required()
})

const SubCategotySchema = Joi.object({
    categoryId: Joi.required(),
    subCategoryName: Joi.string().required()
})

const ProsuctSchema = Joi.object({
    subCategoryId: Joi.required(),
    productName: Joi.string().required(),
    price: Joi.required(),
    color: Joi.string().required(),
    model: Joi.string().required()
})


module.exports = {
    LoginSchema,
    RegisterSchema,
    CategoriesSchema,
    SubCategotySchema,
    ProsuctSchema
}