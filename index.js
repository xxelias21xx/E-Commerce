const express = require('express');
const EcommerceDB = require('./Config/dataBase');
const router = require('./Routes/router');

const app = express();
const PORT = process.env.PORT || 4002;
EcommerceDB();

app.use(express.json());
app.get('/', (req, res) => res.send('Api ejecutando'));
app.use('/Ecommerce/api', router); 


app.listen(PORT, () => console.log(`Servidor iniciado en el puerto: ${PORT}`));