const {Schema, model } = require('mongoose');


const UserScheme = Schema({
  name: {
    type: String,
    required: [true, "the name is required"]
  },
  email: {
    type: String,
    required: [true, "the email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "the password is required"]
  },
  img:{
    type: String
  },
  rol:{
    type: String,
    required: [true, "the rol is required"],
    enum: ['ADMIN_ROL', 'USER_ROL', 'MOD_ROL']
  },
  estatus: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false

  }
})

module.exports = model('User', UserScheme)