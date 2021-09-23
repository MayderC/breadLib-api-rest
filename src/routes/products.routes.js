const express = require('express')
const router  = express.Router()
const {check} =  require('express-validator')
const products = require('../controllers/products.controller')
const {isTypeOfProductValid, validateStock} = require('../helpers/productsValidators')

const {validateFields} = require('../middlewares/validateFields')
const {validateJwt} = require('../middlewares/validate-jwt')
const  {isAdmin} = require('../middlewares/validate-role')
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

  
  router.delete('/:id', [validateJwt, isAdmin], (req, res)=>{
    res.send({msg :"Eres Admin"})
  })


  return router
}
