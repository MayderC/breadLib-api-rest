const OrderModel = require('../models/order.model')


const insertOrder = (req, res)=>{
  const newOrder = new OrderModel({date : new Date, quantity: 10, products: ["hola"], total: 10})
  try {
    newOrder.save()
    res.send({hola : "Hollalaa"})

  } catch (error) {    
  }

}

//Todos los peditos.
const getAllLastOrders = async(req, res) =>{
  const result = await OrderModel.find()

  res.json({result})

}


//Ultimas ordenes, sin pagar o pendientes




//orden canceladas.





//orde entregadas y pagados





//orden entregada sin pagar.




module.exports = {
  insertOrder,
  getAllLastOrders
}