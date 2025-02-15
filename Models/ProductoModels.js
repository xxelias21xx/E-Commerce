const MongoCone=require('mongoose');
const Sucursal = require('./SucursalModels');
const ProductData=new MongoCone.Schema({
    NomProdu:{
        type:String,
        required:true
    },
    DescProdu:{
        type:String,
        required:true
    },
    TallaProdu:{
        type:String,
        required:true
    },
    PrecioProdu:{
        type:Number,
        required:true
    },
    StockSucursal: [
        {
          SucursalId: {
            type: MongoCone.Schema.Types.ObjectId,
            ref: 'Sucursal',
            required: true
          },
          stock: {
            type: Number,
            required: true
          }
        }
      ]
});
const Producto = MongoCone.model('Producto', ProductData);

module.exports = Producto;