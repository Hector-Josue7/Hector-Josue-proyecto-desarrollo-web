const mongoose = require('mongoose')
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
        res.render('prueba');
    }
};
module.exports = middlewares;