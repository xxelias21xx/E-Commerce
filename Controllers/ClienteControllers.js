const TblCliente = require('../Models/ClienteModel');
const dotenv = require('dotenv');
const MongoCone = require('mongoose');
dotenv.config();

exports.RegistrarCliente=async(req,res)=>{
    const { TipoDocu, NroDocu, NomCliente, ApeCliente, DireCliente, TelCliente}=req.body;
    try {
        const DataCliente=new TblCliente({
            TipoDocu,
            NroDocu, 
            NomCliente, 
            ApeCliente, 
            DireCliente, 
            TelCliente
        })

        DataCliente.save();
        res.status(201).json({ mensaje: 'Cliente registrado correctamente', Cliente: DataCliente });

    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({mensaje:'El documento ya está registrado'});
        } else {
            res.status(500).json({ mensaje: 'Ocurrio un problema en el servidor', Error: error.message });
        }
    }
}

exports.ActualizarCliente=async(req,res)=>{
    const { id }= req.params;
    const { TipoDocu, NroDocu, NomCliente, ApeCliente, DireCliente, TelCliente}=req.body;
    try {
        const objectId =new MongoCone.Types.ObjectId(id);
        const VeriDocu = await TblCliente.findOne({ NroDocu });
        const idveri=VeriDocu._id.toString();
        if (VeriDocu && VeriDocu._id.toString() !== objectId.toString()) {
            return res.status(400).json({ mensaje: 'El número de documento ya está en uso por otro cliente', id,idveri });
        }
        const DataCliente=await TblCliente.findByIdAndUpdate(
            objectId,
            { TipoDocu, NroDocu,  NomCliente, ApeCliente, DireCliente, TelCliente },
            { new: true }
        );

        if (!DataCliente) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.status(200).json({ mensaje: 'Cliente actualizado correctamente', Cliente: DataCliente });
    } catch (error) {

            res.status(500).json({ mensaje: 'Ocurrio un problema en el servidor', Error: error.message });

    }
}

exports.EliminarCliente=async(req,res)=>{
    const { id }= req.params;
    try {
        const objectId =new MongoCone.Types.ObjectId(id);
        const DataCliente=await TblCliente.findByIdAndDelete(objectId);

        if (!DataCliente) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.status(200).json({ mensaje: 'Cliente eliminado correctamente', Cliente: DataCliente });
    } catch (error) {
        res.status(500).json({ mensaje: 'Ocurrio un problema en el servidor', Error: error.message });
    }
}