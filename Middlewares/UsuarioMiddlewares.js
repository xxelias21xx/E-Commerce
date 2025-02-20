const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const Autoriza = (req, res, next) => {
    const token = req.header('x-access-token');
    if (!token) {
        return res.status(401).json({ mensaje: 'TOKEN no autorizado' });
    }

    try {
        // const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        // req.user = decoded.user.id;
        // req.userRole = decoded.user.roles; // Asegúrate de que 'roles' es el campo correcto
        // next();


        console.log('Token recibido:', token);
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        console.log('Token decodificado:', decoded);

        if (!decoded || !decoded.id || !decoded.roles) {
            throw new Error('Estructura del token decodificado fallida ');
        }

        req.user = decoded.id;
        req.userRoles = decoded.roles;
        next();

    } catch (error) {
        console.error('Error al verificar el token:', error); // Log para depuración
        res.status(401).json({ mensaje: 'TOKEN no es valido', error: error.message });
    }
};

const esAdmin = (req, res, next) => {
    if (!req.userRoles.includes('admin')) {
        return res.status(403).json({ mensaje: 'Acceso denegado: se requiere rol de administrador' });
    }
    next();
};
const esModerador = (req, res, next) => {
    if (!req.userRoles.includes('moderator')) {
        return res.status(403).json({ mensaje: 'Acceso denegado: se requiere rol de moderador' });
    }
    next();
};
const esUser = (req, res, next) => {
    if (!req.userRoles.includes('user')) {
        return res.status(403).json({ mensaje: 'Acceso denegado: se requiere rol de usuario' });
    }
    next();
};
module.exports = {Autoriza, esAdmin,esModerador,esUser};