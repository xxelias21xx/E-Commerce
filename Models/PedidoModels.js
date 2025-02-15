const MongoCone = require('mongoose');

const PedidoData = new MongoCone.Schema({
    IdCliente: {
        type: MongoCone.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    NroPedido: {
        type: String,
        required: true
    },
    IdSucursal: {
        type: MongoCone.Schema.Types.ObjectId,
        ref: 'Sucursal',
        required: true
    },
    Total: {
        type: Number,
        required: true
    },
    Fecha: {
        type: Date,
        default: Date.now
    },
    Estado: {
        type: String,
        enum: ['Pendiente', 'Completado', 'Cancelado'],
        default: 'Pendiente'
    },
    Productos: [
        {
            NroItem: {
                type: Number,
                required: true
            },
            IdProducto: {
                type: MongoCone.Schema.Types.ObjectId,
                ref: 'Producto',
                required: true
            },
            CantoProdu: {
                type: Number,
                required: true
            },
            PrecProdu: {
                type: Number,
                required: true
            },
            TotItem: {
                type: Number,
                required: true
            }
        }
    ],
});

const Pedido = MongoCone.model('Pedido', PedidoData);

module.exports = Pedido;