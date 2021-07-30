const ProductModel = require('../models/products.model')

const inserProduct = async(req, res)=>{

  const {name, description, type, price, stock, img} = req.body.product
  const product = new ProductModel({name, description, type, price, stock, img})


  const result = await ProductModel.findOne({type})
  // se actualiza el stock si existe el  a insertar.
  if(result){
    /**
     * TODO: Si ya existe un producto en la base de datos. con un tipo de producto igual al que viene por el metodo POST
     * entonces se actualizara el stack del producto de ese tipo en la base de datos, más la cantidad que viene por metodo post.
     * 
     * si no existe, quiere decir que es la primera vez que se guarda, entonces el programa sigue con normalidad. no entra a este if
     * porque no lo encuentra.
    */

    // si estock es negativo se multiplica por -1 para pasarlo a positivo sin cambiar la cantidad,
    // si no no hace nada. y regresa el mismo
    let stockFromPost = stock <0 ?  stock*-1: stock;
    let stokFromDB = result.stock;
    let newStockToSave = stokFromDB + stockFromPost

    //Actualizacion en mongo, retorna el documento actualizado
    const newProductUpdated =  await ProductModel.findByIdAndUpdate(result._id, {stock : newStockToSave})
    return res.status(200).send({newProductUpdated})
  }

  try {
    product.save()
  } catch (error) {
    
  }

  return res.status(201).json(req.body.product)
}

module.exports = {
  inserProduct
}