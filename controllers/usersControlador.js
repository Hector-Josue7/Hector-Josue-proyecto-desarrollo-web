
const mongoose  = require('mongoose')
const express = require('express');
const passport = require('passport');

//var User = require("../models/user").User;
var User = require('../models/user')
const service = require('../modules/services')
function getUser(req,res){
    User.find({_id:req.params.id})
  .then(data=>{
      res.send(data);
  })
  .catch(error=>{
      res.send(error);
  });
  }
/*
app.get('/api/product/:productId', (req,res)=>{
  let productId = req.params.productId
  Product.findById(productId, (err, product)=>{
    if(err) res.status(500).send({message: `Error al realizar peticion:  ${err}`})
    if(!product) return res.status(404).send({message: `El producto no existe`})
    res.status(200).send({product:product})
  })
})


app.egt('/api/product', (req,res)=>{
  Product.find({}, (err, products)=>{
    if(err) res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!products) return res.status(404).send({message: 'No existen productos'})
    res.send(200, {products})
  })
})

app.delete('/api/product/:productId', (req,res)=>{
  let productId = req.params.productId
  Product.findById(productId, (err,product)=>{
    if(err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
    product.remove(err=>{
         if(err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
         res.status(200).send({message: 'El producto ha sido eliminado'})
    })
  })
})
*/
function getUsers(req,res){
    User.find({}, (err,usersi) =>{
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!usersi) return res.status(404).send({message: 'No existen usuarios'})
        res.send(200, {usersi})
      })
}
function saveUser (req,res){
    console.log('POST/users/userId')
    console.log(req.body)
  //  res.send(200, {message: 'El producto se ha recibido' })
  //res.status(404).send({message: 'El producto no existe'})
  let user = new User()
  user.nombre = req.body.nombre,
  user.correo = req.body.correo,
 user.pass = req.body.pass,
  user.tipoPlan = req.body.tipoPlan
  
  
  /*
  nombre: String,
    apellido: String,
    usuario:String,
    contrasena: String,
    correo: String,
    tipoUsuario: String,
  */

  user.save((err, userStored)=>{
    if(err) res.status(500).send({message: `Error al salvar de la base de datos: ${err}`})
  res.status(200).send({user: userStored})
  })
}
function updateUser(req,res){
  User.update(
    {_id:req.params.id},
    {
        nombre : req.body.nombre,
        apellido : req.body.apellido,
        correo:req.body.correo,
        pass: req.body.pass,

        plan : {
                nombre : req.body.nombrePlan
              
        }

     
    }
).then(result=>{
    res.send(result);
})
.catch(error=>{
    res.send(error);
});
}
function deleteUser (req,res){
    
  
  User.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
 
}
function login (req, res){  // http://localhost:8111/login
 
  /*   User.find({  $or:[
    {  $or:[{ correo:req.body.correo},
      { usuario:req.body.usuario }]
     
     
    },
    {
      $and:[
        {pass:req.body.pass}
      ]
    }

  ] }
 )
 */
console.log(req.body.correo)
User.find({correo:req.body.correo, pass:req.body.pass})
    .then(data=>{
        if (data.length==1){//Significa que si encontro un usuario con las credenciales indicadas
            //Establecer las variables de sesion
           req.session.codigoUsuario = data[0]._id;
            req.session.correoUsuario =  data[0].correo;
            req.session.codigoTipoPlan = data[0].tipoPlan;
            res.send({status:1,mensaje:"Usuario autenticado con éxito", usuario:data[0]});
        }else{
            res.send({status:0,mensaje:"Credenciales inválidas"});
        }
        
    })
    .catch(error=>{
        res.send(error);
    }); 
  
}







function logout(req,res){
  req.session.destroy();
  res.redirect("/");
}   

/*
function signUp (req,res){
  const us = new users({
    correo: req.body.correo,
    displayName: req.body.displayName,
    pass: req.body.pass
  })
  us.save((err)=>{
    if(err) res.status(500).send({message: `Error al crear el usuario: ${err}`})
    return res.status(200).send({token: service.createToken(us)})

  })
}
*/


 function signUp (req,res){
  const us = new User({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    correo: req.body.correo,
  //  usuario: req.body.usuario,
    pass: req.body.pass,
    tipoPlan:req.body.tipoPlan
  })
  us.save((err)=>{
    if(err) res.status(500).send({message: `Error al crear el usuario: ${err}`})
    return res.status(200).send({token: service.createToken(us)})

  })
}


function signIn(req,res){
  User.find({correo:req.body.correo, pass:req.body.pass}, (err,user)=>{
    if(err) return res.status(500).send({message:err}) 
    if(!user) return res.status(404).send({message: 'No existe el usuario'})
    //req.user= user
    req.user= user
    res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user)

    })
  })
}


///kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk

module.exports ={
getUser,
getUsers,
saveUser,
updateUser,
deleteUser,
login,
logout,
signUp,
signIn,

}