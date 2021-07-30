const {validationResult} = require('express-validator')


const validateFields = (req, res, next) =>{
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    console.error("Error de parametros: ",errors['errors'])
    return res.status(400).send(reportErrors(errors['errors']))
  }
  next();
}

const reportErrors =  (arr)=>{
  //item.param = body.param
  const newArr = arr.map(item => ({msg: item.msg, param: item.param.split(".")[1], location: item.location}))
  return newArr
}


module.exports = {validateFields}