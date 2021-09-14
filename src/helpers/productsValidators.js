const TypeOfProduct = require('../models/typeProducts.model')


/**Si el tipo de producto que viene por metodo POST en req, no existe en la colleccion 
 * tipo de productos, retorna un error..
 * 
 * Para esto se hace una consulta a la base de datos buscando el tipo que viene en req
 * 
 */

// se utiliza en orders tambien. para verificar el tipo de producto. que se esta pidiendo.
// 

const isTypeOfProductValid = async(item) =>{
  const result = await TypeOfProduct.findOne({type: item})
  if(!result){
    throw new Error("No existe un tipo de producto llamado: "+item)
  }
  return true
}

/**si el stack que viene por metodo POST en req,  no es un numero, es undefined o es menor 0 
 * se lanza un error.
*/

const validateStock = (stock) =>{
  if(typeof stock != 'number' || stock == undefined || stock < 1){
    throw new Error("Stock NO puede ser, menor o igual a cero, string o undefined")
  }
  return true
}

module.exports = {
  isTypeOfProductValid,
  validateStock,
}