const express = require('express')
const mongoose = require('mongoose')
const userController = require('../controllers/usersControlador')
//const userController2 = require('../../../Documents/indexedEjemplo/AuthCtrl')
const middleware = require('../modules/middleware');
var passport = require('passport');
const ruteador = express.Router()




//ruteador.get('/', )
ruteador.get('/getUsers', userController.getUsers) //obtener todos los usuarios  http://localhost:3001/usuarios
ruteador.get('/:id',userController.getUser) // obtener un usuario
ruteador.post('/signup',userController.saveUser) // guardar usuarios http://localhost:3001/usuarios/signup
ruteador.put('/:id', userController.updateUser)  // actualizar usuarios  http://localhost:3001/usuario/
ruteador.delete('/:id', userController.deleteUser) //eliminar usuarios

ruteador.post("/login", userController.login); // http://localhost/usuarios/login

ruteador.get("/prueba", middleware.paginaInicio, function (req, res) {
  res.render('prueba');
});
ruteador.get("/prueba", middleware.paginaInicio, function (req, res) {
  res.render('prueba2');
});




ruteador.get("/peticion-registringido",verificarAutenticacion,function(req, res){
  res.send("Este es un contenido restringido");
  res.end();
});

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,




ruteador.get('/inicio', (req, res, next) => {
  res.render('index');
});

ruteador.get('/signup', (req, res, next) => {
  res.render('signup');
});

ruteador.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
})); 

ruteador.get('/signin', (req, res, next) => {
  res.render('signin');
});


ruteador.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  failureFlash: true
}));

ruteador.get('/profile',isAuthenticated, (req, res, next) => {
  res.render('profile');
});

ruteador.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});


function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/')
}


function verificarAutenticacion(req, res, next){
	if(req.session.correoUsuario)
		return next();
	else
		res.send("ERROR, ACCESO NO AUTORIZADO");
}

module.exports = ruteador;

/*
ruteador.get('/login', userController2.getLogin);

ruteador.post('/login', userController2.login);

ruteador.get('/logout', userController2.logout);

ruteador.get('/register', userController2.getRegister);

ruteador.post('/register', userController2.register);

*/


/*

ruteador.get('/', (req, res) => {
  res.render('index');
});

ruteador.get('/about', (req, res) => {
  res.render('about');
});

*/



