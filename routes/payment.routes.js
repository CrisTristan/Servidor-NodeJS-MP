import { Router } from 'express'
import {createOrder} from '../controllers/payment.controllers.js'
const router = Router();
import productSchema from '../src/js/products.js'
import clientSchema from '../src/js/clients.js'
import  cors from 'cors'

let corsOptions = {
  origin: 'https://viverolastorres.onrender.com/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.get("/", cors(corsOptions), (req, res)=>res.send("Bienvenido a mi Servidor en node.js"));

router.post("/create-order", cors(corsOptions), createOrder);

//router.post("/webhook", receiveWebhook);

router.get("/success", cors(corsOptions), (req, res) => res.send("Success"));

router.get("/pending", cors(corsOptions), (req, res) => res.send("Pending"));

router.get("/failure", cors(corsOptions), (req, res)=>res.send("Ocurrio un error tu compra no puedo realizarse"));

router.post("/products", cors(corsOptions), (req, res)=>{
        res.statusCode(200);
         const product = productSchema(req.body)
         product
          .save()
          .then((data)=> res.json(data))
          .catch(error=> res.json({ message: error}))
});

router.get("/products", cors(corsOptions), (req, res)=>{
  productSchema
  .find()
  .then((data)=> res.json(data))
  .catch(error=> res.json({ message: error}))
});

router.post("/clients", cors(corsOptions), (req, res)=>{
  //res.statusCode(200);
   const client = clientSchema(req.body)
   console.log(req.body);
   client
    .save()
    .then((data)=> res.json(data))
    .catch(error=> res.json({ message: error}))
});

router.get("/clients", cors(corsOptions), (req, res)=>{
  clientSchema
  .find()
  .then((data)=> res.json(data))
  .catch(error=> res.json({ message: error}))
});

 const searchClient = (req, res)=>{
  clientSchema
  .findById(req.params.id)
  .then((data)=> res.json(data))
  .catch(error=> {
    res.json("No se encontro al cliente con id "+req.params.id)})
 }

router.get("/clients/:id", cors(corsOptions), searchClient);


export default router;