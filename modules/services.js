const jwt = require('jwt-simple')
const moment = require('moment')
const config = require ('../config')


function createToken (user){
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(), // esto significa que la sesion la guarda por 14 dias, se puede hacer por mas tiempo, incluso un año
      }
   return jwt.encode(payload, config.SECRET_TOKEN)
}
function decodeToken (token){
  const decoded = new Promise((resolve, reject) =>{
    try{
         const payload = jwt.decode(token, config.SECRET_TOKEN)
         if(payload.exp <= moment().unix()){
         reject({
         status: 401,
         message: 'El token ha expirado'
                })   
              }
     resolve(payload.sub)
} 
catch(err){
      reject({
        status:500,
        message: 'Token invalido'
      })
    }
  })
  return decoded
}

module.exports = {
  createToken,
  decodeToken
}