const mongoose = require('mongoose');

const SucursalDatos = new mongoose.Schema({
  NomSucursal: {
    type: String,
    required: true
  },
  DireSucursal: {
    type: String,
    required: true
  },
  CeluSucursal:{
    type: String,
    required: true
  }
});

const Sucursal = mongoose.model('Sucursal', SucursalDatos);

module.exports = Sucursal;