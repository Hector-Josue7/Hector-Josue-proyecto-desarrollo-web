var express = require("express");
var router = express.Router();


const usuario = require('../models/usuario')

//Obtener el listado de todos los usuarios
router.post("/signup",function(req,res){
 //   console.log(req.body)
   // res.status(404).send({message: 'El usuario no existe'})

   console.log(req.body)
   let user = new users()
   user.nombre = req.body.nombre
   user.apellido = req.body.apellido
   user.correo = req.body.correo
   user.pass = req.body.pass
   //user.plan = req.body.plan
   user.selectPlan = {
    _id: req.body.selectPlan,
    nombre: req.body.nombrePlan
}

   user.save((err, userStored)=>{
       if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

       res.status(200).send({user: userStored})
   })

})




module.exports = router;