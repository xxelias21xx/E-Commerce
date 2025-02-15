const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const Autoriza=(req,res,next)=>{
    const token=req.header('Authorization');
    if (!token) {
        return res.status(401).json({mensaje:'TOKEN no autorizado'})
    }

    try {
        const decoded=jwt.verify(token,process.env.SECRET_TOKEN);
        req.user=decoded;
        next();
    } catch (error) {
        res.status(401).json({mensaje:'TOKEN no es valido', error})
    }
}

module.exports=Autoriza;