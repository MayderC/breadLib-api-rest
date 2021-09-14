const express = require('express')
const Router = express.Router()
const typeProduct = require('../controllers/typeProducts.controller')

module.exports = ()=>{
  Router.post('/', typeProduct.insertTypeOfProduct)
  return Router
}