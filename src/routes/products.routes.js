const express = require('express')
const router  = express.Router()
const products = require('../controllers/products.controller')
const {check} =  require('express-validator')
const TypeOfProduct = require('../models/typeOfProducts.model')
const {validateFields} = require('../middlewares/validateFields')


module.exports = ()=>{

  router.post('/insert',[
    check('product.type').custom(async(item) =>{

      const result = await TypeOfProduct.findOne({type: item})
      if(!result){

        throw new Error("No existe un tipo de producto llamado: "+item)
      }

    }),
    validateFields
  ] ,products.inserProduct)



  return router
}
