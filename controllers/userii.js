
const User = require('../models/useri')

const service = require ('../modules/services')

const signUp = (req, res) => {
    const user = new User({
      correo: req.body.correo,
      displayName: req.body.displayName,
      clave: req.body.clave
    })
    user.avatar = user.gravatar();
    user.save(err => {
      if (err) return res.status(500).send({ msg: `Error al crear usuario: ${err}` })
      return res.status(200).send({ token: service.createToken(user) })
    })
  }

const signIn = (req, res) => {
    User.findOne({ correo: req.body.correo }, (err, user) => {
      if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
      if (!user) return res.status(404).send({ msg: `no existe el usuario: ${req.body.correo}` })
  
      return user.comparePassword(req.body.clave, (err, isMatch) => {
        if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
        if (!isMatch) return res.status(404).send({ msg: `Error de contraseña: ${req.body.correo}` })
  
        req.user = user
        return res.status(200).send({ msg: 'Te has logueado correctamente', token: service.createToken(user) })
      });
  
    }).select('_id email +clave');
  }

function login  (req,res){
        User.find({displayName: req.body.displayName,clave: req.body.clave})
        .then(data=>{
            if (data.length==1){//Significa que si encontro un usuario con las credenciales indicadas
                //Establecer las variables de sesion
                req.session.codigoUsuario = data[0]._id;
                req.session.correo =  data[0].correo;
            //    req.session.codigoTipoUsuario = data[0].tipoUsuario;
                res.send({status:1,mensaje:"Usuario autenticado con éxito", usuario:data[0]});
            }else{
                res.send({status:0,mensaje:"Credenciales inválidas"});
            }
            
        })
        .catch(error=>{
            res.send(error);
        }); 
        /*if (req.body.usuario == 'jperez' && req.body.contrasena=='asd.456'){
            req.session.codigoUsuario = 1;
            req.session.correoUsuario =  'jperez@gmail.com';
            req.session.codigoTipoUsuario = '2';
        }*/
  
}


function logout (req, res){
    req.session.destroy();
    res.redirect("/");

}


module.exports = {
    signUp,
   signIn,
   login,
   logout
}