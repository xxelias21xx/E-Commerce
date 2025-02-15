const { GeneraToken, GenerandoPago } = require('../Models/ProcePagoModels');

const ProcesandoPago = async (req, res) => {
    const producto = req.body;
    try {
        const Token = await GeneraToken(producto);
        const DatosPago = await GenerandoPago(producto, Token.id);
        res.send({ message: DatosPago });
    } catch (error) {
        res.send({ message: error });
    }
};

module.exports = { ProcesandoPago };