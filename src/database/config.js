const mongoose = require('mongoose');

const conection =  async()=>{

  try {

    await mongoose.connect(process.env.MONGO_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    
    mongoose.set('returnOriginal', false)
    console.log("Conectado a MongoDB")
  } catch (error) {
    
    throw new Error("Ha ocurrido un error en la base de datos")

  }


}

module.exports = {
  conection
}