const TblSucursal = require('../Models/SucursalModels');
const dotenv = require('dotenv');
const MongoCone = require('mongoose');
dotenv.config();

exports.RegistrarSucursal=async(req,res)=>{
    const { NomSucursal, DireSucursal, CeluSucursal } = req.body;
    try {
        let DataSucursal=new TblSucursal({
            NomSucursal,
            DireSucursal,
            CeluSucursal
        })

        await DataSucursal.save();

        res.status(201).json({ mensaje: 'Sucursal registrada correctamente', sucursal: DataSucursal });


    } catch (error) {
        res.status(401).json({mensaje:error.message})
    }
}

exports.ActualizarSucursal = async (req, res) => {
    const { id } = req.params;
    const { NomSucursal, DireSucursal, CeluSucursal } = req.body;
    try {
        const objectId =new MongoCone.Types.ObjectId(id);
        const DataSucursal = await TblSucursal.findByIdAndUpdate(
            objectId,
            { NomSucursal, DireSucursal, CeluSucursal },
            { new: true }
        );
        console.log(DataSucursal);
        if (!DataSucursal) {
            return res.status(404).json({ mensaje: 'Sucursal no encontrada' });
        }

        res.status(200).json({ mensaje: 'Sucursal actualizada correctamente', sucursal: DataSucursal });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

exports.EliminarSucursal = async (req, res) => {
    const { id } = req.params;
    try {
        const objectId =new MongoCone.Types.ObjectId(id);
        const DataSucursal = await TblSucursal.findByIdAndDelete(objectId);

        if (!DataSucursal) {
            return res.status(404).json({ mensaje: 'Sucursal no encontrada' });
        }

        res.status(200).json({ mensaje: 'Sucursal eliminada correctamente' });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};