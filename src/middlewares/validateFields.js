const {validationResult} = require('express-validator')


const validateFields = (req, res, next) =>{
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    return res.status(406).json({errors :reportErrors(errors['errors'])})
  }
  next();
}

/**Esta funcion lo que hace es recibir el array de errores antes de retornarlo como error/badrequest
 * y lo procesa para solo mostrar lo que se necesite,  evitando devolver algunos resultados.
 * y mostrado solo que se ocupa.
 */

const reportErrors =  (arr)=>{
  //item.param = body.param
  const newArr = arr.map(item => ({msg: item.msg, param: item.param.split(".")[1], location: item.location}))
  return newArr
}


module.exports = {validateFields}