import express from 'express'
import morgan from 'morgan';
import paymentRoutes from '../routes/payment.routes.js'
import bodyParser from 'body-parser';
import {PORT, MONGODB_URI} from './config.js'
import mongoose from 'mongoose';


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//Morgan es un Modulo que sirve para recibir mensajes 
//por consola de las peticiones que llegan al servidor:
//get, post etc.
app.use(morgan('dev'));
//Conexion a mongoDB
mongoose
.connect(MONGODB_URI)
.then(()=>console.log('Connected to MongoDB'))
.catch(error => console.error(error));

//rutas
app.use(paymentRoutes);

app.use((req, res, next)=>{
res.status(404).json({
  message: 'Endpoint not found'   
})

})
//app.use(express.static('src/public'));

app.listen(PORT, ()=>{
      console.log(`Servidor escuchando en puerto ${PORT}`);    
});

