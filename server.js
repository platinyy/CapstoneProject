const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require("dotenv").config()

const PORT = process.env.PORT || 3001

const db = require('./db')


const AuthRouter = require('./routes/AuthRouter')
const CategoryRouter = require('./routes/CategoryRouter')
const ItemRouter = require('./routes/ItemRouter')
const OrderRouter = require('./routes/OrderRouter')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/auth', AuthRouter)
app.use('/categories', CategoryRouter)
app.use('/items', ItemRouter)
app.use("/orders", OrderRouter)

app.use('/', (req, res) => {
  res.send(`Connected!`)
})

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
