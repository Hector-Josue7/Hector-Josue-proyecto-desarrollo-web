const mongoose = require("mongoose")
//var bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema
const user_schema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    correo: String,
    pass: String,
  //date_of_birth: date
  // age: Number,
   //  username: String,
 //selectPlan:  mongoose.Schema.Types.Mixed  

 plan : mongoose.Schema.Types.Mixed,
});
module.exports = mongoose.model('users',user_schema);
/* user_schema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};
user_schema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password,this.local.password);
};

*//*
user_schema.virtual("password_confirmation").get(function(){
    return this.p_c;

}).set(function(password){
this.p_c = pass;
});
*/
module.exports = mongoose.model('users',user_schema);
//,,,,,,,,,,,,,,,,,,,,,,,,,




