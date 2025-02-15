const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../Models/UsuarioModel');
const dotenv = require('dotenv');

dotenv.config();
exports.RegistrarUsuario=async(req,res)=>{
    const { NomUsuario, ApeUsuario, EmailUsuario, password } = req.body;
    try {
        let DataUsuario=new Usuario({
            NomUsuario,
            ApeUsuario,
            EmailUsuario,
            password
        })
    
        await DataUsuario.save();
        const payload = {
            user: {
              id: DataUsuario.id
            }
          };
    
          jwt.sign(
            payload,
            process.env.SECRET_TOKEN,
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;
              res.json({ mensaje:"Usuario registrado correctamente",token });
            }
          );
    } catch (error) {
        res.status(401).json({mensaje:error.message})
    }
}

exports.InicioSesion=async(req, res)=>{
    const { EmailUsuario, password } = req.body;

    try{
        let DatUsuario = await Usuario.findOne({ EmailUsuario });
        if (!DatUsuario) {
        return res.status(400).json({ msg: 'Usuario Invalido' });
        }

        const isMatch = await bcrypt.compare(password, DatUsuario.password);
        if (!isMatch) {
        return res.status(400).json({ msg: 'Contraseña Invalida' });
        }

        const payload = {
        user: {
            id: DatUsuario.id
        }
        };

        jwt.sign(
        payload,
        process.env.SECRET_TOKEN,
        { expiresIn: 360000 },
        (err, token) => {
            if (err) throw err;
            res.json({ token });
        }
        );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}