var express = require('express');
var bodyParser =require("body-parser");
var test = require("./modules/test");
var mongoose = require("mongoose");

var planesRouter = require('./routes/planesEnrutador');   // Se clasifican los planes en la base de datos
var usuarioRouter = require('./routes/usersEnrutador');   // cada plan puede tener distintos tipos de usuarios
//var carpetasEnrutador = require('./routes/carpetasEnrutador'); // cada usuario puede tener muchas carpetas
//var archivosEnrutador = require('./routes/archivosEnrutador');// cada carpeta puede tener muchos archivos y un usuario puede tener muchos archivos
//var cors = require('cors'); //Cross-Origin Resource Sharing (CORS), Intercambio de recursos de origen cruzado (CORS)
var app = express();
const port = process.env.PORT || 3001

//MIDDLEWARES|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//app.use(cors());
app.use(bodyParser.urlencoded({extended:true})); //Para procesar las peticiones que vienen en la URL.
app.use(bodyParser.json()); //Para procesar las peticiones que vienen como JSON.
app.use("/planes",planesRouter);
app.use("/users" , usuarioRouter);
//app.use("/carpetas" , carpetasEnrutador);
//app.use("/archivos" , archivosEnrutador);


//FUNCIONES|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
app.get("/",function(req, res){
  res.send(test.mensaje());
});


app.post("/signup",function(req,res){
  //   console.log(req.body)
    // res.status(404).send({message: 'El usuario no existe'})

    console.log(req.body)
    let user = new usuarios()
    user.nombre = req.body.nombre
    user.apellido = req.body.apellido
    user.correo = req.body.correo
    user.pass = req.body.pass
    user.plan = req.body.plan
 
    user.save((err, userStored)=>{
        if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
 
        res.status(200).send({user: userStored})
    })
 
 })
 
//Peticion para guardar un usuario
/*
router.post("/guardar-usuario", function(req, res){
    var user = new User({

            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correo:req.body.correo,
            pass:req.body.pass
    });

    console.log(JSON.stringify({
        nombre: String,
    apellido: String,
    correo: String,
    pass: String,
}));
*/
/*
app.post('/usuarios', (req, res) => {
console.log(req.body)
res.status(404).send({message: 'El producto no existe'})
//res.status().send({message: 'El producto se ha recibido'})
})
*/


//PUERTO DE ESCUCHA Y CONEXION A MONGO DB ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
mongoose.connect('mongodb://localhost:27017/bd_Rolexi', (err , res) => {
  if(err){
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  console.log ('Conexión a la base de datos bd_Rolexi establecida...')
   app.listen(port, () => {
    console.log(`Servidor en linea corriendo en http://localhost:${port}`);
  })
  })






//require('./passport')(app, passport);
//app.use(flash());
//app.set('views', './public/vistas')
//app.set('view engine', 'pug');

//require('./routes/enrutador,js')


// routes

//require('./routes/usuarios-routers.js')



//PUERTO DE ESCUCHA***********************************************************************************************************

//app.set('views', './public/views')

//app.set('views', __dirname + 'views');
//app.engine('pug', engine);






// ROUTES************************************************************************
 // app.('views', path.join(__dirname, 'vistas'))
  //app.set('views', 'views')
//app.ngine('ejs', engine);
//app.set('view engine', 'ejs');





/* 
app.use(morgan('dev'));


//app.set("view engine", "pug");

app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

*/



/* 
app.use((req, res, next) => {
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.user = req.user;
  console.log(app.locals)
  next();
});
*/


/*  app.post("/sessions", function(req,res){
  
    User.findOne({
      correo: req.body.correo,
      pass: req.body.pass
    }  , function(err,docs){
      console.log(docs);
      res.send("Hola Mundo");

    });
  });*/


// FUNCIONES*************************************************************************************************************************************

/*
app.get('/',function(request, response){
  response.send({resultado:'ok'});
});

app.get("/login", function(req,res){
  User.find(function(err,doc){
    console.log(doc);
    res.render("login");
  });
});

*/
//-------------------
//const path = require('path');
//const flash = require('connect-flash');
//const session = require('express-session');
//const passport = require('passport');
//const morgan = require('morgan');
//---------------
//require('./modules/local-auth');
//bbnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
// middlewares
/* app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.user = req.user;
  console.log(app.locals)
  next();
});
*/












