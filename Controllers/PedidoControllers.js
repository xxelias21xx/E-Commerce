const TblPedido = require('../Models/PedidoModels');
const TblProducto = require('../Models/ProductoModels');
const dotenv = require('dotenv');
const MongoCone = require('mongoose');
dotenv.config();

exports.RegistrarPedido = async (req, res) => {
    const { IdCliente, NroPedido, IdSucursal, Total, Fecha, Estado, Productos } = req.body;

    try {
        if (!Array.isArray(Productos)) {
            return res.status(400).json({ mensaje: 'Productos debe ser un array' });
        }

        for (const itemprod in Productos) {
            const item = Productos[itemprod];
            const DtProducto = await TblProducto.findOne({ _id: item.IdProducto, 'StockSucursal.SucursalId': IdSucursal });
            if (!DtProducto) {
                return res.status(404).json({ mensaje: `Producto ${item.NomProdu} no encontrado` });
            }

            const sucursal = DtProducto.StockSucursal.find(s => s.SucursalId.toString() === IdSucursal.toString());
            if (!sucursal) {
                return res.status(404).json({ mensaje: `Producto ${item.IdProducto} no encontrado en sucursal` });
            }

            if (sucursal.stock < item.CantoProdu) {
                return res.status(400).json({ mensaje: `Stock insuficiente` });
            }

            sucursal.stock -= item.CantoProdu;
            await DtProducto.save();
        }

        const DataPedido = new TblPedido({
            IdCliente,
            NroPedido,
            IdSucursal,
            Total,
            Fecha,
            Estado,
            Productos: Productos.map(item => ({
                NroItem: item.NroItem,
                IdProducto: item.IdProducto,
                CantoProdu: item.CantoProdu,
                PrecProdu: item.PrecProdu,
                TotItem: item.TotItem
            }))
        });

        await DataPedido.save();

        res.status(201).json({ mensaje: 'Pedido registrado correctamente', Pedido: DataPedido });

    } catch (error) {
        res.status(500).json({ mensaje: 'Ocurrió un problema en el servidor', Error: error.message });
    }
};