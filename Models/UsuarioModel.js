const MongoCone = require('mongoose');
const bcrypt = require('bcrypt');
const rolesPerm = ["admin", "moderator", "user"];
const Usuario=new MongoCone.Schema({
    NomUsuario:{
        type:String,
        required:true
    },
    ApeUsuario:{
        type:String,
        required:true
    },
    EmailUsuario:{
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Por favor, rellene una dirección de correo electrónico válida']
    },
    password: {
        type: String,
        required: true
      },
    roles: {
        type: String,
        enum: rolesPerm,
        required: true
    }
});

Usuario.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
const DataUsuario = MongoCone.model('Usuario', Usuario);
module.exports=DataUsuario;