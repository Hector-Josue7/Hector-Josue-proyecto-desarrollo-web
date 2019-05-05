const mongoose = require('mongoose')
const app = require('./app')
const config = require ('./config')

//SERVIDOR Y BASE DE DATOS MONGO DB
mongoose.connect(config.db,  { useNewUrlParser: true }, (err,res)=>{
  if(err){
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  console.log('Conexión a la base de datos establecida...')
  app.listen(config.port, () =>{
    console.log(`Backend corriendo en http://localhost:${config.port}`)
    })

})
