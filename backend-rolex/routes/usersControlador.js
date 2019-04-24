const express = require('express')
const userController = require('../controllers/usersControlador')
const ruteador = express.Router()


ruteador.get('/', userController.getUsers) //obtener todos los usuarios
ruteador.get('/:id',userController.getUser) // obtener un usuario
ruteador.post('/',userController.saveUser) // guardar usuarios
ruteador.put('/:id', userController.updateUser)  // actualizar usuarios
ruteador.delete('/:id', userController.deleteUser) //eliminar usuarios

module.exports = ruteador

