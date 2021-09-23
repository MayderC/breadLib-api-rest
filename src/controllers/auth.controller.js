const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const {generateJWT} = require('../helpers/generate-jwt')
const {googleVerify} = require('../helpers/google-verify')



const userRegister = async(req, res) =>{
  
  const ROL_DEFAULT = "USER_ROL"
  // Ver errores de express-validator- en rutas.
  //Extraer datos del, post req
  const {name, email, password} = req.body.user
  
  //verificar si el correo existe
  let findEmail = await User.findOne({email})

  if(findEmail){
    return res.status(400).send({msg: `Error al registrar: ${email}`})
  }
  
  const userInsert = new User({name, email, password, rol : ROL_DEFAULT})
  //hash de la contraseña
  const salt = bcryptjs.genSaltSync()
  userInsert.password = bcryptjs.hashSync(password, salt);

  //guardar en db
  try {
    userInsert.save()
  } catch (error) {
    console.log("********************")
    console.log(error.message)
    throw new Error("Error create user")
  }
  res.status(200).json({status : "Registrado con exito"})
}


const login = async(req, res)=>{

  const {email, password} = req.body.user
  /**
   * Busca si existe un usuario con el correo ingresado
   */
  const result = await User.findOne({email})

  if(!result){return res.status(400).send({msg : "Correo o contraseña Incorrectos"})

  }else if(!result.estatus){return res.status(403).send({msg: "No tienes permitido entrar. Habla con el Administrador del sitio"})}

  /**Compara la contraseña con la contraseña ecriptada */

  const validatePassword = bcryptjs.compareSync(password, result.password)
  /**
   * si es false retornamos mensaje de error.
   * tambien comprueba si el estado del usuario es false, retorna error
   */
  if(!validatePassword){
    return res.status(400).send({msg: "Correo o contraseña Incorrectos"})
  }

  //Generando token para el usuario
  const token = await generateJWT(result._id)

  res.send({token})
}



const googleSingin = async(req, res)=>{

  const token = req.body.id_token

  try {
    const googlePayload = await googleVerify(token)
    res.send({googlePayload})

  } catch (error) {return res.status(400).send({msg: "Error en el token de google"})}

}


module.exports = {
  login,
  googleSingin,
  userRegister
}