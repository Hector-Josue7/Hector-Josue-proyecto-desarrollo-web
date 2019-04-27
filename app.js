'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const ruteadori = require('./routes/rutas')
const midd = require('./modules/middlewares')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
var homeUsuario = express.static("home");

app.use('/ejemplo', ruteadori)  // http://localhost:3001/ejemplo

/* app.use(
    function(req,res,next){
        if (req.session.correo){
            //Significa que el usuario si esta logueado
            if (req.session.codigoTipoUsuario == 'Gratis')
                homeUsuario(req,res,next);
           // else if (req.session.codigoTipoUsuario == 'Administrador')
            //    publicAdmin(req,res,next);
        }
        else
            return next();
    }
);
*/
app.use(
    function(req,res,next){
        if (req.session.correo){
            //Significa que el usuario si esta logueado
            if (req.session.codigoTipoUsuario == 'Gratis')
                homeUsuario(req,res,next);
           // else if (req.session.codigoTipoUsuario == 'Administrador')
            //    publicAdmin(req,res,next);
        }
        else
            return next();
    }
);






module.exports = app

