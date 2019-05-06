var mongoose = require("mongoose")
var Schema = mongoose.Schema
var bcrypt = require('bcrypt-nodejs');
var crypto =require('crypto')
//var session = require('express-session');


//var email_match= [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Coloca un email valido"];
const user_schema = new Schema({

    nombre: String,
    
    correo:{type:String, unique:true, lowercase:true},
    //usuario: {type:String, required:true, maxlength:[50, "Username muy grande"]},

    pass:String,
    tipoPlan:  mongoose.Schema.Types.Mixed 
    //correo:{type:String, unique:true, lowercase:true}
    //avatar:String
    //pass: {type:String, select: false},
    // signupDate: {type: Date, default: Date.now()}
    //lastLogin: Date
   // usuario: {type:String, required:true, maxlength:[50, "Username muy grande"]},
  
   // correo: {type: String, required: "El correo es obligatorio", match:email_match},
    //pass: {type: String, minlength:[8, "El password es muy corto"]},
    //price: {type:Number, default: 0},
    // category: {type:String, enum['computers', 'phones', 'accesories']},
  
});


//hnnnnnnnnnnnnnnnnnnnn
/* UserSchema.methods.encryptPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(pass, salt);
  return hash;
};

UserSchema.methods.matchPassword = async function (pass) {
  return await bcrypt.compare(pass, this.pass);
};


module.exports = mongoose.model('User', UserSchema);*/

//nnnnnnnnnnnnnnnnnnnnnn



user_schema.pre('save', function (next) {
  if (!this.isModified('pass')) return next()
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(this.pass, salt, null, (err, hash) => {
      if (err) return next(err)
      this.pass = hash
      next()
    })
  })
})

user_schema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.pass, (err, isMatch) => {
    cb(err, isMatch)
  });
}
user_schema.methods.gravatar = function (size) {
  if (!size) {
    size = 200;
  }
  if (!this.correo) return `https:/gravatar.com/avatar/?s${size}&d=retro`
  const md5 = crypto.createHash('md5').update(this.correo).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`
} 



user_schema.statics.authenticate = function(correo, pass, callback) {
  this.findOne({ correo: correo }, function (err, user) {
      if (err) return callback(err);

      if (!user) return callback(null, false, {message: 'Incorrect email.'});

      if (!user.validPassword(pass)) return callback(null, false, {message: 'Incorrect password.'});

      return callback(null, user);
  });
};





module.exports = mongoose.model('users',user_schema);
//var User = mongoose.model("User", user_schema);
//module.exports.User= User;

//,,,,,,,,,,,,,,,,,,,,,,,,,







