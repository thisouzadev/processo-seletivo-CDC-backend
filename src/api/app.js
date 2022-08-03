const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')
// const router = require('../routes')
const err = require('../middlewares/errorHandler')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
// app.use(router)
app.use(err)
module.exports = app