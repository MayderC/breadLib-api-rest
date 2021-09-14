const express = require('express')
const router  = express.Router()
const products = require('../controllers/products.controller')
const {check} =  require('express-validator')
const {validateFields} = require('../middlewares/validateFields')
const {isTypeOfProductValid, validateStock} = require('../helpers/productsValidators')


module.exports = ()=>{

  /**Esta ruta llama el controlador que regresa toda la lista de productos */

  router.get('/', products.getAllProducts)

  /**Validaciones antes de insertar un producto 
   * tipo de producto
   * stock del producto o cantidad a ingresar.
  */

  router.post('/',
  [
    check('product.type').custom(isTypeOfProductValid),
    check('product.stock').custom(validateStock),
    validateFields
  ] ,
  products.inserProduct)

  



  return router
}
