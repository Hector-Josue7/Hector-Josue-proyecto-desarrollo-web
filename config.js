module.exports = {
    port: process.env.PORT || 3001,
    db: process.env.MONGODB || 'mongodb://localhost:27017/bd_proyecto',
    SECRET_TOKEN: 'aquipuedeircualquiergarabato'  
}