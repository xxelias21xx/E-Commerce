const Culqi = require('culqi-node');
require('dotenv').config();

const culqi = new Culqi({
    privateKey: process.env.privateKey,
    publicKey: process.env.publicKey,
    pciCompliant: true
});

const GeneraToken = async (producto) => {
    return await culqi.tokens.createToken({
        card_number: producto.creditcard,
        cvv: producto.cvv,
        expiration_month: producto.month,
        expiration_year: producto.year,
        email: producto.email
    });
};

const GenerandoPago = async (producto, tokenId) => {
    return await culqi.charges.createCharge({
        amount: producto.amount,
        currency_code: producto.currency_code,
        email: producto.email,
        installments: producto.installments,
        description: producto.description,
        source_id: tokenId
    });
};

module.exports = { GeneraToken, GenerandoPago };