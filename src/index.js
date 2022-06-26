const express = require('express')

const validation = require('./middleware/validation')
const checkToken = require('./middleware/checkToken')
const {PORT} = require('./config/config')

const usersRouter = require('./routers/users')
const ctgRouter = require('./routers/categories')
const subCtgRouter = require('./routers/subCategories')
const productRouter = require('./routers/products')

const app = express()

app.use(express.json())
app.use(validation)
app.use(checkToken)

app.use(usersRouter)
app.use(ctgRouter)
app.use(subCtgRouter)
app.use(productRouter)


app.use((err, req, res, next) => {
    return res.status(err.status || 400).send({
        status : err.status || 400,
        message: err.message
    })
})

app.listen(PORT, () => console.log('Server is run'))   