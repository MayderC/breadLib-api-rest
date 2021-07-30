const express = require('express');
const con = require('../database/config');
require("dotenv").config();
const os = require("os");



class Server {
  
  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.miIp = os.networkInterfaces()['Wi-Fi'][1].address;


    this.conexion() 
    this.middlewares()
    this.routes()
  }

  async conexion(){
    await con.conection()
  }

  middlewares(){

    this.app.use(express.json())
    this.app.use(express.static('public'))
  }

  routes(){    

    this.app.use('/api/user', require("../routes/user.routes")() )
    this.app.use('/api/product', require('../routes/products.routes')())
    this.app.use('/api/producttype', require('../routes/typeProduct.routes')())
  }

  start(){
    this.app.listen(parseInt(this.port), () => {
      console.log(`http://${this.miIp}:${this.port}`)
    })
  }
}
module.exports =  Server