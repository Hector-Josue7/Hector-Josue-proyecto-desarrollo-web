const express = require('express')   
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars');   
const methodOverride = require('method-override');   
const session = require('express-session');    
const flash = require('connect-flash');    
const passport = require('passport');       
const path = require('path');    
const ruter = require('./routes/users-rutas') // se importa el modelo rutas
const ruter2 = require('./routes/user-routers')  // se importa el controlador user-routers

// Initializations
const app = express();

require('./modules/passport');   

// settings
app.set('views', path.join(__dirname, 'views')); 
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');


// static files
app.use(express.static(path.join(__dirname, 'public')));




// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))  //ya
app.use(methodOverride('_method'));
app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/usuarios', ruter)
 //Verificar si existe una variable de sesion para poner publica la carpeta public admin o cajero
 var publicUsuario = express.static("private");
app.use(
  function(req,res,next){
      if (req.session.correoUsuario){
          //Significa que el usuario si esta logueado
          if (req.session.codigoTipoPlan == 'Gratis' ||req.session.codigoTipoPlan == 'Normal' || req.session.codigoTipoPlan == 'Avanzado')
              publicUsuario(req,res,next);
         // else if (req.session.codigoTipoUsuario == 'Administrador')
          //    publicAdmin(req,res,next);
      }
      else
          return next();
  }
);



// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });

// routes
app.use(require('./routes'));
app.use(require('./routes/user-routers'));
app.use(require('./routes/notes'));











//require('./passport')
//app.set('view engine', 'pug');
module.exports = app

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<







//Implementar midleware que verifica si tiene acceso a las carpetas correspondientes utilizando las variables de sesion

app.post("/login",function(req, res){

    usuario.find({usuario:req.body.usuario, contrasena:req.body.contrasena})
    .then(data=>{
        if (data.length==1){//Significa que si encontro un usuario con las credenciales indicadas
            //Establecer las variables de sesion
            req.session.codigoUsuario = data[0]._id;
            req.session.correoUsuario =  data[0].correo;
            req.session.codigoTipoUsuario = data[0].tipoUsuario;
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
});

app.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect("/");
});

//La siguiente es una peticion restringida, se envia una funcion midleware que verifica si esta autenticadoo no.
app.get("/peticion-registringido",verificarAutenticacion,function(req, res){
    res.send("Este es un contenido restringido");
    res.end();
});

///Para agregar seguridad a una ruta especifica, esta función sería llamada desde alguna peticion.
function verificarAutenticacion(req, res, next){
	if(req.session.correoUsuario)
		return next();
	else
		res.send("ERROR, ACCESO NO AUTORIZADO");
}

app.listen(8111);



