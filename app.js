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




