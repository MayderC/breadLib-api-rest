const ProductModel = require('../models/products.model')


const stockAndQuantityValidator = async(item) =>{

  //todo: buscar que la cantidad, sea menor a la cantidad en stock del tipo de producto. que viene enn item
  let typeProduct = item.type
  let quantiy = item.quantity
  let result = await ProductModel.findOne({type : typeProduct})
  if(quantiy <= result.stock){
    return true
  }
  throw new Error(`No hoy productos suficientes cantidad disponible: ${result.stock}, pedidos :${quantiy}`)
}



module.exports = {
  stockAndQuantityValidator
}