const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema
//const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String
});

userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword= function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);

///**************************************** */
/* 
const ProductSchema = Schema ({
  name: String,
  picture: String,
  price: {type: String, enum:[ 'computers', 'phones', 'accesories']},
  description: String
})

module.exports=mongoose.model('Product', ProductSchema)
*/
