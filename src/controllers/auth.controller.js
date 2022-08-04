const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const {generateJWT} = require('../helpers/generate-jwt')



const userRegister = async(req, res) =>{
  
  const ROL_DEFAULT = "USER_ROL"
  const {name, email, password} = req.body.user
  
  let findEmail = await User.findOne({email})

  if(findEmail)
    return res.status(400).send({msg: `Error al registrar: ${email}`})
  
  const userInsert = new User({name, email, password, rol : ROL_DEFAULT})
  const salt = bcryptjs.genSaltSync()
  userInsert.password = bcryptjs.hashSync(password, salt);

  try {
    userInsert.save()
  } catch (error) {
    return res.status(400).send({msg: "Error"})
  }

  return res.status(200).json({status : "Registrado con exito"})
}


const login = async(req, res)=>{

  const {email, password} = req.body.user

  const result = await User.findOne({email})
  if(!result) 
    return res.status(400).send({msg : "Correo o contraseña Incorrectos"})
  if(!result.estatus)
    return res.status(403).send({msg: "No tienes permitido entrar. Habla con el Administrador del sitio"})
  if(!bcryptjs.compareSync(password, result.password))
    return res.status(400).send({msg: "Correo o contraseña Incorrectos"})
  
  const token = await generateJWT(result._id)

  return res.status(200).send({token})
}


module.exports = {
  login,
  googleSingin,
  userRegister
}