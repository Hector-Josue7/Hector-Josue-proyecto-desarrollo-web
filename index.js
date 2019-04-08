var express=require("express");
var bodyParser =require("body-parser");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var app = express();
mongoose.connect("mongodb://localhost/primera_pagina");

var userSchemaJSON ={
email:String,
password: String
};
var user_schema = new Schema(userSchemaJSON);
var User = mongoose.model("User", user_schema);
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","pug");

app.get("/", function(req,res){
res.render("index");
});
app.get("/login", function(req,res){
 User.find(function(err,doc){
   console.log(doc);
   res.render("login");
 });
  
});


app.post("/users", function(req,res){
var user = new User({
  nombre: req.body.nombre,
  apellido: req.body.apellido,
  correo: req.body.correo,
  pass: req.body.pass
});
user.save(function(){
  res.send("Guardamos todos tus datos");
});
  console.log("Nombre: " + req.body.nombre);
console.log("Apellido: " + req.body.apellido);

res.send("recibimos tus datos");
});


app.listen(3333, function(){
    console.log("Servidor iniciado en el puerto 3333");
});


//routes

//iniciando el servidor



/* 
var app = express();
mongoose.connect("mongodb://localhost/primera_pagina");
// Colecciones => Tablas
// Documentos => Filas
var userSchemaJSON = {
email:String,
password:String
};
var user_schema = new Schema(userSchemaJSON);
var User = mongoose.model("User", user_schema);

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})); //extended: false significa que parsea solo string (no archivos de imagenes por ejemplo)

app.get("/", function(req,res){
res.render("index");
});

app.get("/login", function(req,res){
  User.find(function(err,doc){
    console.log(doc);
  });
res.render("login");
});
 
app.post("/users", function(req,res){
//console.log("Contraseña:" + req.body.password);
//console.log("Email: "+req.body.email);
var user = new User({email: req.body.email, password: req.body.pass});
user.save(function(){
  res.send("Recibimos tus datos");
});

});

//Levantar el servidor en el puerto 3333
app.listen(3333, function(){
    console.log("Servidor levantado en el puerto 3333");
});

*/
/* var credenciales = {
  host:"localhost",
  user:"root",
  password:"",
  port:"3306",
  database: "bd_proyecto"
};
*/