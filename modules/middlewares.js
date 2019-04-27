

const services = require('./services')
const session = require("express-session");

/*
function isAuth (req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'No tienes autorización'})
}
const token = req.headers.authorization.split('')[1]
services.decodeToken(token)
.then(response =>{
    req.user = response
    next()
    })
    .catch(response =>{
        res.status(response.status)
    })
}

module.exports = isAuth
*/

 

function verificarAutenticacion(req, res, next){
	if(req.session.correo)
		return next();
	else
		res.send("ERROR, ACCESO NO AUTORIZADO");
}

module.exports = verificarAutenticacion




