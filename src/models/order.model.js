const {model, Schema} = require('mongoose')


const OrderSchema = new Schema({
  date: {
    type: Date
  },
  quantity: {
    type:Number,
    require: [true, 'Cantidad de productos en el pedido es requerido']
  },
  products:{
    type: Array,
    require: [true, 'Para realizar un pedido se necesita al menos 1 producto.']
  },
  total: {
    type: Number
  },
  isCancelled : {
    type: Boolean,
    require : [true, 'el dato is cancelled es requerido'],
  },
  status: {
    type: String,
    enum : ['ENTREGADO', 'PENDIENTE'],
    default: 'PENDIENTE'
  }
})

module.exports = model('order', OrderSchema)
