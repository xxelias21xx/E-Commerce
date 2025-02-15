const MongoCone=require('mongoose');
const ClienteData=new MongoCone.Schema({
    TipoDocu:{
        type:String,
        required:true
    },
    NroDocu:{
        type:String,
        required:true,
        unique: true
    },
    NomCliente:{
        type:String,
        required:true
    },
    ApeCliente:{
        type:String,
        required:true
    },
    DireCliente:{
        type:String,
        required:true
    },
    TelCliente:{
        type:String,
        required:true
    }
})

const Cliente=MongoCone.model('Cliente',ClienteData);
module.exports=Cliente
