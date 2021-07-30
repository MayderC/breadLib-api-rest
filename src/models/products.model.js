const {Schema, model} = require('mongoose')

const ProductSchema = Schema({
  name:{
    type: String,
    required:[true, 'El nombre es requerido'],
  },
  description: {
    type: String
  },
  type:{
    type: String,
    required: [true, 'El tipo de producto es requerido'],
    enum: ['SIMPLE', 'DULCE', 'TOSTADO', 'COMBINADO', 'ARROLLADO'],
    unique: true
  },
  price:{
    type: String,
    required: [true, 'El precio es requerido']
  },
  stock:{
    type: Number,
    required: [true, 'La cantidad de productos es requerida']
  },
  img:{
    type: String
  }
})

module.exports = model('product', ProductSchema)