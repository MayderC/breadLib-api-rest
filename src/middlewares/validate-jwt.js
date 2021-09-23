const {request, response} = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateJwt = async(req = request, res = response, next)=>{
  const token = req.header('x-token')

  if(!token){
    return res.status(400).send({msg:"Error no hay token en la petición"})
  }


  try {

    const {uid} = jwt.verify(token, process.env.PRIVATE_KEYWORD_JWT)
    req.uid = uid

    const user = await User.findById({_id: req.uid})
    if(!user.estatus){return res.status(400).send({msg : "No tienes acceso"})}
    
    next()
    
  } catch (error) {return res.status(400).send({msg : "Token invalido"})}

}



module.exports = {
  validateJwt
}
