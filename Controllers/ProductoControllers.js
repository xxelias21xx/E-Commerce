const TblSucursal = require('../Models/SucursalModels');
const TblProducto = require('../Models/ProductoModels');
const dotenv = require('dotenv');
const MongoCone = require('mongoose');
dotenv.config();

exports.ResgistrarNewProducto=async(req,res)=>{
    const { NomProdu, DescProdu, TallaProdu, PrecioProdu,StockSucursal } = req.body;

    try {
        if (!Array.isArray(StockSucursal)) {
            return res.status(400).json({ mensaje: 'StockSucursal debe ser un array' });
        }

        const IdSucursal=StockSucursal.map(item=>item.SucursalId.toString());
        if (IdSucursal.length != new Set(IdSucursal).size){
            return res.status(400).json({ mensaje: 'Establecimiento ya existe en el producto' });
        }
        
        const DataProducto = new TblProducto({
            NomProdu,
            DescProdu,
            TallaProdu,
            PrecioProdu,
            StockSucursal: StockSucursal.map(item => ({
                SucursalId: item.SucursalId,
                stock: item.stock
            }))
        });
        await DataProducto.save();

        res.status(201).json({ mensaje: 'Producto registrado correctamente', Producto: DataProducto });

    } catch (error) {
        res.status(500).json({ mensaje: 'Ocurrio un problema en el servidor', Error: error.message });
    }
}

exports.ActualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { NomProdu, DescProdu, TallaProdu, PrecioProdu, } = req.body;

    try {
        const objectId =new MongoCone.Types.ObjectId(id);
        const DataProducto = await TblProducto.findByIdAndUpdate(
            objectId,
            { NomProdu, DescProdu, TallaProdu, PrecioProdu },
            { new: true } 
        );

        if (!DataProducto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.status(200).json({ mensaje: 'Producto actualizado correctamente', producto: DataProducto });
    } catch (error) {
        res.status(500).json({ mensaje: 'Ocurrio un problema en el servidor', Error: error.message });
    }
};

exports.EliminarProducto = async (req, res) => {
    const { id } = req.params;

    try {
        const objectId =new MongoCone.Types.ObjectId(id);
        const productoEliminado = await TblProducto.findByIdAndDelete(objectId);

        if (!DataProducto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error del servidor', Error: error.message });
    }
};