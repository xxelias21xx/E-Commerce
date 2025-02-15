const MongoCone = require('mongoose');

const PagoData = new MongoCone.Schema({
    NroPago:{
        type: String,
        required: true
    },
    IdPedido: {
        type: MongoCone.Schema.Types.ObjectId,
        ref: 'Pedido',
        required: true
    },
    MontPago: {
        type: Number,
        required: true
    },
    MetoPago: {
        type: String,
        enum: ['Tarjeta', 'PayPal', 'Transferencia'],
        required: true
    },
    FecPago: {
        type: Date,
        default: Date.now
    }
});

const Pago = MongoCone.model('Pago', PagoData);

module.exports = Pago;