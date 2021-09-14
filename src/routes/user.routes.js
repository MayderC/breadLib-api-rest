const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const {check} = require('express-validator')
const {validateFields} = require('../middlewares/validateFields')


module.exports = () =>{

  router.get('/', user.getInfo)

  router.post('/signup',
  [ check('user.name', 'El nombre no puede estar vacio').not().isEmpty(),
    check('user.email', 'El correo no es valido').isEmail(),
    check('user.password', 'La contraseña tiene que ser mayor a 6 caracteres').isLength({min: 6}),
    validateFields
  ],user.createUser);

  
  router.post('/signin', user.signIn)

  
  return router;
};
