const  {Schema, model} = require('mongoose')


const TypeOfProductSchema = Schema({
  type:{
    type: String,
    anum: ['SIMPLE', 'DULCE', 'TOSTADO', 'COMBINADO', 'ARROLLADO'],
    required: true,
    unique: true
  }
})


module.exports = model('TypeOfProduct', TypeOfProductSchema)