const users = require('../models/user')

function getUser(req,res){
  let userId = req.params.id
users.findById(userId, (err, user)=>{
  if(err) return res.status(500).send({message: `Error al relizar la petición: ${err}`})
  if(!user) return res.status(404).send({message: `El producto no existe`})
  res.status(200).send({user: user})
})




  }

function getUsers(req, res){
    users.find({}, (err,usersi) =>{
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
  let user = new users()
  user.nombre = req.body.nombre
  user.apellido = req.body.apellido
  user.correo = req.body.correo
  user.pass = req.body.pass
  user.plan = req.body.plan

  user.save((err, userStored)=>{
    if(err) res.status(500).send({message: `Error al salvar de la base de datos: ${err}`})
  res.status(200).send({user: userStored})
  })
}
function updateUser(req,res){
 
 users.update(
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
    res.send(result)
})
.catch(error=>{ 
    res.send(error);
}   )
}
  


function deleteUser (req,res){
    let userId = req.params.id
    users.findById(userId, (err, user) =>{
      if(err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})
    user.remove(err =>{
      if(err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})
      res.status(200).send({message: 'El usuario ha sido eliminado '})
  
    })
   
    })
}

module.exports ={
getUser,
getUsers,
saveUser,
updateUser,
deleteUser
}