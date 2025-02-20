const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../Models/UsuarioModel');
const Role = require('../Models/RoleModels');
const dotenv = require('dotenv');

dotenv.config();
exports.RegistrarUsuario=async(req,res)=>{
    const { NomUsuario, ApeUsuario, EmailUsuario, password,roles } = req.body;
    try {
        let DataUsuario=new Usuario({
            NomUsuario,
            ApeUsuario,
            EmailUsuario,
            password,
            roles:roles || "user"
        })

        await DataUsuario.save();
        const payload = {
            user: {
              id: DataUsuario.id,
              roles:DataUsuario.roles
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

exports.InicioSesion = async (req, res) => {
    const { EmailUsuario, password } = req.body;

    try {
        const user = await Usuario.findOne({ EmailUsuario }).populate("roles", "-__v");
        if (!user) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: "Password invalido" });
        }

        const token = jwt.sign(
            { id: user.id, roles: user.roles },
            process.env.SECRET_TOKEN,
            {
                algorithm: "HS256",
                allowInsecureKeySizes: true,
                expiresIn: 86400 // 24 horas
            }
        );

        res.status(200).send({
            id: user._id,
            username: user.NomUsuario,
            token: token
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};