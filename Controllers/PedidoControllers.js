const TblPedido = require('../Models/PedidoModels');
const dotenv = require('dotenv');
const MongoCone = require('mongoose');
dotenv.config();

exports.RegistrarPedido=async(req,res)=>{
    const { IdCliente, NroPedido, IdSucursal, Total, Fecha, Estado, Productos } = req.body;

    try {
        
        if (!Array.isArray(Productos)) {
            return res.status(400).json({ mensaje: 'Productos debe ser un array' });
        }

        const DataPedido= new TblPedido({
            IdCliente, 
            NroPedido, 
            IdSucursal,
            Total, 
            Fecha, 
            Estado, 
            Productos: Productos.map(item=>({
                NroItem:item.NroItem,
                IdProducto:item.IdProducto,
                CantoProdu:item.CantoProdu,
                PrecProdu:item.PrecProdu,
                TotItem:item.TotItem
            }))
        });

        DataPedido.save();

        res.status(201).json({ mensaje: 'Pedido registrado correctamente', Pedido: DataPedido });

    } catch (error) {
        res.status(500).json({ mensaje: 'Ocurrio un problema en el servidor', Error: error.message });
    }

}