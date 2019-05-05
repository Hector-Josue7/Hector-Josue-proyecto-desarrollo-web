

const services = require('../modules/services')
const mongoose = require('mongoose')
function isAuth(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'No tienes autorización'})

    }
    const token = req.headers.authorization.split(' ')[1]
   services.decodeToken(token)
   .then(response => {
       req.user= response
       next()
   })
   .catch(response =>{
       res.status(response.status)
   })
}
module.exports = isAuth

/*
const middlewares = {
    isAuthenticated: function (req, res, next) {
        if (req.session.user)
            return next();

        res.redirect('/iniciarsesion');
    },
    loginRegistro: function (req, res, next) {
        if (!req.session.user)
            return next();
        res.redirect('/dashboard');
    },
    paginaInicio: function(req, res,next){
        if (!req.session.user)
            return next();
        res.render('home');
    }
};
module.exports = middlewares;
*/





