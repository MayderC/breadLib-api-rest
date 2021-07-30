const TypeOfProduct = require('../models/typeOfProducts.model')

const insertTypeOfProduct = async (req, res)=>{
  const {type} = req.body.product
  const typeToInsert = new TypeOfProduct({type})

  // Busca un producto, con el tipo de producto que viene por post. para luego evitar insertarlo y solo actualizarlo.
  const result = await TypeOfProduct.findOne({type})
  if(result){



    return res.status(400).send({
      msg : `Y existe el tipo de producto ${type}`
    })
  }


  try {
    typeToInsert.save()
  } catch (error) {
    
  }

  return res.status(201).send({msg: 'Nuevo de producto insertado'})
}


module.exports = {insertTypeOfProduct}