var mongoose = require("mongoose");

var plan_esquema = new mongoose.Schema(
    {
        nombre : String,
        descripcion : String
    }
);
module.exports = mongoose.model('planes',plan_esquema);









