const express = require('express')
const autenticacion = require ('../modules/middlewares')  // para establecer privadas algunas rutas
const userController = require('../controllers/usersControlador')
const useriiController = require('../controllers/userii')
var session = require("express-session");
const ruteador = express.Router()

//usersControlador  -> userController 
ruteador.get('/capo', userController.getUsers) //obtener todos los usuarios  http://localhost:3001/ejemplo/capo
ruteador.get('/:id',userController.getUser) // obtener un usuario            http://localhost:3001/ejemplo/_id
//ruteador.post('/signupi',userController.saveUser) // guardar usuarios        http://localhost:3001/ejemplo/signupi
ruteador.put('/:id', userController.updateUser)  // actualizar usuarios      http://localhost:3001/ejemplo/_id
ruteador.delete('/:id', userController.deleteUser) //eliminar usuarios       http://localhost:3001/ejemplo/_id

// userii  -> useriiController
ruteador.post('/signup', useriiController.signUp) //   http://localhost:3001/ejemplo/signup       Registrarse
ruteador.post('/signin', useriiController.signIn) //   http://localhost:3001/ejemplo/signin       Loguearse 
ruteador.post('/login', useriiController.login)  //    http://localhost:3001/ejemplo/login        iniciar sesion
ruteador.get('/logout', useriiController.logout)  //   http://localhost:3001/ejemplo/logout       destruir sesion




ruteador.get('/private',autenticacion,  (req, res) => {      // http://localhost:3001/ejemplo/private
res.status(200).send({message: 'Dispones del acceso correcto'})
res.end()
})

module.exports = ruteador



