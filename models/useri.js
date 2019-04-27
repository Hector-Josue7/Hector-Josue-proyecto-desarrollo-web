const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require ('crypto')
var session = require("express-session");


/* 

db.usuarios.insertMany([{ "nombre" : "Pedro",
                            "apellido" : "Martinez",
                             "usuario" : "pmartinez", 
                             "correo" : "pmartinez@gmail.com",
                              "contrasena" : "asd.456",
                               "tipoUsuario" : "Cajero"
                            },
        { "nombre" : "Juan", 
        "apellido" : "Perez",
         "usuario" : "jperez",
          "correo" : "jperez@gmail.com",
          "contrasena" : "asd.456", 
          "tipoUsuario" : "Administrador" 
        }]);

*/

const UserSchema = new Schema({
    nombre: String,
    apellido: String,
    correo: {type: String, unique: true, lowercase: true},
    displayName: String,
    clave: {type: String, select: false},
  //  avatar: String,
 
    signupDate: {type: Date, default: Date.now()},
    lastLogin: Date

    //categoria : mongoose.Schema.Types.Mixed,  
    
    plan : {    "_id" : ObjectId("5ca3814381a123ccbd73abfc"),
    "nombre" : "Comedia" 
}, 



})


UserSchema.pre('save', function (next) {
    if (!this.isModified('clave')) return next()
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err)
  
      bcrypt.hash(this.clave, salt, null, (err, hash) => {
        if (err) return next(err)
        this.clave = hash
        next()
      })
    })
  })
  


  UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.clave, (err, isMatch) => {
      cb(err, isMatch)
    });
  }


UserSchema.methods.gravatar = function (size) {
    if (!size) {
      size = 200;
    }
    if (!this.email) return `https:/gravatar.com/avatar/?s${size}&d=retro`
    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`
  }
  
  
  module.exports =  mongoose.model('User', UserSchema)