const express = require('express');
const con = require('./database/config');
require("dotenv").config();
const os = require("os");
const cors = require('cors')

/**
 * Clase de nuestro servidor 
 */

class Server {
  
  constructor(){
    this.app = express();
    this.port = process.env.PORT;

    this.conexion() 
    this.middlewares()
    this.routes()
  }

  async conexion(){
    await con.conection()
  }

  middlewares(){
    this.app.use(cors())
    this.app.use(express.json())
  }

  routes(){    
    this.app.use('/api/user', require("./routes/user.routes")() )
    this.app.use('/api/products', require('./routes/products.routes')())
    this.app.use('/api/producttype', require('./routes/typeProduct.routes')())
    this.app.use('/api/orders', require('./routes/order.routes')())
    this.app.use('/api/auth', require('./routes/auth.routes')())
  }

  start(){
    this.app.listen(parseInt(this.port), () => {
      console.log(`${this.port}`)
    })
  }
}
module.exports =  Server