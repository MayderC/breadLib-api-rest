
const isIdInRoles = (...roles)=>{

  return (req, res, next)=>{

    if(releaseEvents.includes(req.uid)){
      next()
    }else{
      return res.send({msg : "No tienes permisos"})
    }

  }

}