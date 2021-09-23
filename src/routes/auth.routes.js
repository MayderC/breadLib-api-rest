const express = require('express')
const router = express.Router()
const {check} = require('express-validator')
const auth = require('../controllers/auth.controller')
const {validateFields} = require('../middlewares/validateFields')

module.exports = () =>{

  router.post('/login',[
    check('user.email', "El correo es obligatorio").isEmail(),
    check('user.password', 'La contrasea es obligatoria').not().isEmpty(),
    validateFields
  ], auth.login)


  router.post('/register',
  [ check('user.name', 'El nombre no puede estar vacio').not().isEmpty(),
    check('user.email', 'El correo no es valido').isEmail(),
    check('user.password', 'La contraseña tiene que ser mayor a 6 caracteres').isLength({min: 6}),
    validateFields
  ],auth.userRegister);


  router.post('/google',[
    check('id_token', 'El token no puede estar vacio').not().isEmpty(),
    validateFields
  ], auth.googleSingin)



  

  return router
}
