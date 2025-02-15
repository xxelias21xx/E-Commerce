const MongoDb = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const conectDB=async()=>{
    try {
        await MongoDb.connect(process.env.MONGOBD,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("Conexion creada")
    } catch (error) {
        console.log("Error al conectar a base de datos E-Commerce")
        process.exit(1)
    }
}

module.exports = conectDB;