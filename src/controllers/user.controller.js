const {response} = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')



const createUser = async(req, res) =>{
  // Ver errores de express-validator- en rutas.

  //Extraer datos del, post req
  const {name, email, password, rol} = req.body.user
  const userInsert = new User({name, email, password, rol})

  //verificar si el correo existe
  let findEmail = await User.findOne({email})
  if(findEmail){
    return res.status(400).send({msg: `${email}. Ya existe una cuanta con este correo.`})
  }

  //hash de la contraseña
  const salt = bcryptjs.genSaltSync()
  userInsert.password = bcryptjs.hashSync(password, salt);

  //guardar en db
  try {
    userInsert.save()
  } catch (error) {
    console.log("este error", error.message)
    throw new Error("Error create user")
  }
  res.status(200).json({status : "ok"})
}

/***************************************/

const getInfo = (req, res)=>{
  res.send("<h1>toda la info</h1>")
} 


/******************* */


const signIn = (req, res)=>{

  res.send({hola : "Holaa"})

}



module.exports  = {createUser, getInfo, signIn};