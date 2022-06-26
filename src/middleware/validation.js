const { ValidationError } = require("../utils/errors");
const { LoginSchema, RegisterSchema, SubCategotySchema, CategoriesSchema, ProsuctSchema } = require("../utils/schema")

const validation = (req, res, next) => {
    try {
        if(req.method != "POST") return next()

        let schema = {}
        switch (req.url) {
            case '/login': schema = LoginSchema; break;
            case '/register': schema = RegisterSchema; break;
            case '/categories': schema = CategoriesSchema; break;
            case '/subcategories': schema = SubCategotySchema; break;
            case '/products': schema = ProsuctSchema; break;
            default: schema = {}; break;
        }
        
        let {error} = schema?.validate(req.body)
        if(error) throw new ValidationError(401, error.message)

        next()

    } catch (error) {
        next(error)
    }
}

module.exports = validation