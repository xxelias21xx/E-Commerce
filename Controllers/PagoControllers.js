const TblPago = require('../Models/PagoModels');
const TblPedido = require('../Models/PedidoModels');
const { GeneraToken, GenerandoPago } = require('../Models/ProcePagoModels');
const dotenv = require('dotenv');
const MongoCone = require('mongoose');
dotenv.config();

exports.RegistrarPagoPedido=async(req,res)=>{
    const { NroPago, IdPedido, MontPago, MetoPago, FecPago,creditcard,cvv,month,year,email,currency_code,installments,description}=req.body;

    try {   
        const PedidoPago={
            creditcard: creditcard,
            cvv: cvv,
            month: month,
            year: year,
            email: email,
            amount: MontPago,
            currency_code: currency_code,
            installments: installments,
            description: description
        }
        const DatosPago = await ProcesandoPago(PedidoPago);
        let ValorError="";
        if (ValorError==="") {
            if (DatosPago.message && DatosPago.message.object) {
                ValorError = DatosPago.message.object;
            }
            if (ValorError || ValorError === "error") {
                const DescError=DatosPago.message.user_message;
                return res.status(500).json({ mensaje: 'Error al procesar el pago', DescError: DescError });
            }

            const DataPago = new TblPago({
                NroPago,
                IdPedido,
                MontPago,
                MetoPago,
                FecPago
            })

            const objectId=new MongoCone.Types.ObjectId(IdPedido);
            const EstadoPedido=await TblPedido.findByIdAndUpdate(
                objectId,
                { Estado:"Completado" },
                { new: true }
            )
            if (!EstadoPedido) {
                return res.status(404).json({ mensaje: 'Pedido no encontrado' });
            }

            DataPago.save()

            const DtProcePago={
                DataPago:DataPago,
                ProcePagoCulqi: DatosPago,
                Pedido:EstadoPedido
            }

            res.status(201).json({ mensaje: 'Pago registrado correctamente', PagoPedido: DtProcePago });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Ocurrio un problema en el servidor', Error: error.message });
    }
}

const ProcesandoPago = async (PedidoPago) => {
    try {
        const Token = await GeneraToken(PedidoPago);
        const DatosPago = await GenerandoPago(PedidoPago, Token.id);
        return {Data : DatosPago}    
    } catch (error) {
        return { message: error }
    }
};


exports.EliminarPagoPedido = async (req, res) => {
    const { IdPago } = req.body;

    try {
        const Pago = await TblPago.findById(IdPago);

        if (!Pago) {
            return res.status(404).json({ mensaje: 'Pago no encontrado' });
        }

        const IdPedido = Pago.IdPedido;

        const pagoEliminado = await TblPago.findByIdAndDelete(IdPago);

        if (!pagoEliminado) {
            return res.status(404).json({ mensaje: 'Pago no encontrado' });
        }

        const objectId =new MongoCone.Types.ObjectId(IdPedido);
        const pedidoActualizado = await TblPedido.findByIdAndUpdate(
            objectId,
            { Estado: "Pendiente" },
            { new: true }
        );

        if (!pedidoActualizado) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        res.status(200).json({ mensaje: 'Pago eliminado y pedido actualizado a pendiente', Pedido: pedidoActualizado });

    } catch (error) {
        res.status(500).json({ mensaje: 'Ocurrio un problema en el servidor', Error: error.message });
    }
};