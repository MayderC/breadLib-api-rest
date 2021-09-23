const express = require('express')
const router = express.Router()
const order = require('../controllers/order.controller')
const {check} =  require('express-validator')
const {validateFields} = require('../middlewares/validateFields')
const {isTypeOfProductValid} = require('./../helpers/productsValidators')
const {stockAndQuantityValidator} = require('../helpers/ordersValidators')

module.exports = ()=>{

  router.post('/',[
    check('order.type').custom(isTypeOfProductValid), 
    // verifica que la cantidad en nueva orden se menor o igual a la 
    // cantidad en stock
    check('order').custom(stockAndQuantityValidator),
    // Proximo verificar que sea un usuario logeado.
    validateFields
  ], 
  order.insertOrder)



  router.get('/all', order.getAllLastOrders)


  return router
}