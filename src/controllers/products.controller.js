const ProductModel = require('../models/products.model')



/********************************************************************* */
/**                         INSERTAR  PRODUCTOS                        */
/********************************************************************* */

const inserProduct = async(req, res)=>{
  // Destructuramos y obtenemos solo que que se necesita guardar,
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
    const {name : iName, stock: iStock, type: iType } = newProductUpdated
    return res.status(200).send({iName, iType, iStock})
  }


  // En este try se guardan los datos en la base de datos
  // si algo sale mal, entra al catch y retorna un error/badrequest
  try {
    product.save()
    return res.status(201).json(req.body.product)
  } catch (error) {
    return res.status(400).send({msg : "error al insertar datos"})
  }
}

/********************************************************************* */
/**                     OBTENER TODOS LOS PRODUCTOS                    */
/********************************************************************* */

/**En esta funcion getAllProducts: se obtiene todos los productos de la base de datos
 * si encuentra resutados, entonces se recorre el array de objtos para solo retornar 
 * lo que se necesita y evitar enviar datos que no queremor mostrar en el frontend
 * si no encuentra nada se salta el if y retorna un bad request.
 */

const getAllProducts = async (req, res)=>{
  const result = await ProductModel.find()
  if(result){
    const toResponse = result.map(r => ({
      name        : r.name,
      description : r.description,
      type        : r.type,
      price       : r.price,
      img         : r.img,
      stock       : r.stock
    }))
    return res.status(200).json({products: toResponse})
  }
  return res.status(404).se.json({msg: "No se encontraron productos."})
}

module.exports = {
  inserProduct,
  getAllProducts
}