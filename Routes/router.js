const express = require('express');
const router = express.Router();

const Autoriza = require('../Middlewares/UsuarioMiddlewares');
const { InicioSesion, RegistrarUsuario } = require('../Controllers/UsuarioControllers');
const { RegistrarSucursal, ActualizarSucursal, EliminarSucursal} = require('../Controllers/SucursalControllers');
const { ResgistrarNewProducto,ActualizarProducto,EliminarProducto} = require('../Controllers/ProductoControllers');
const { RegistrarCliente,ActualizarCliente,EliminarCliente} = require('../Controllers/ClienteControllers');
const { RegistrarPedido} = require('../Controllers/PedidoControllers');
const { RegistrarPagoPedido,EliminarPagoPedido} = require('../Controllers/PagoControllers');
const { ProcesandoPago} = require('../Controllers/ProcePagoControllers');

// Definiendo rutas de usuario
router.post('/usuario/login', InicioSesion);
router.post('/usuario/registrarUsuario', RegistrarUsuario);

// Definiendo rutas de sucursal
router.post('/sucursal/registrarSucursal', RegistrarSucursal);
router.put('/sucursal/actualizarSucursal/:id', ActualizarSucursal);
router.delete('/sucursal/eliminarSucursal/:id', EliminarSucursal);

//Definiendo rutas de producto
router.post('/producto/registrarProducto', ResgistrarNewProducto);
router.put('/producto/ActualizarProducto/:id', ActualizarProducto);
router.delete('/producto/EliminarProducto/:id', EliminarProducto);

//Definiendo rutas de Cliente
router.post('/cliente/registrarCliente', RegistrarCliente);
router.put('/cliente/ActualizarCliente/:id', ActualizarCliente);
router.delete('/cliente/EliminarCliente/:id', EliminarCliente);

//Definiendo rutas de Pedido
router.post('/pedido/registrarPedido', RegistrarPedido);

//Definiendo rutas de Pago
router.post('/pago/registrarPago', RegistrarPagoPedido);
router.delete('/pago/EliminarPago/', EliminarPagoPedido);

//Definiendo rutas de proceso de pago
router.post('/procesoPago/RegistrarProcesoPago', ProcesandoPago);


module.exports = router;
