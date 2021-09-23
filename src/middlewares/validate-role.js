const User = require('../models/user')



const isAdmin = async(req, res, next)=>{

  const ADMIN = 'ADMIN_ROL'

  if(!req.uid){return res.status(500).send("Validando rol, sin verificar token")}

  try {

    const result = await User.findById({_id : req.uid})

    if(result.rol === ADMIN){next()

    }else{return res.status(400).send({msg : "No tienes permisos"})}

  } catch (error) {return res.send({msg : "Error al buscar en la base de datos"})}
}
module.exports = {isAdmin}