import { Router } from 'express'
import {createOrder} from '../controllers/payment.controllers.js'
const router = Router();
import productSchema from '../src/js/products.js'

router.get("/", (req, res)=>res.send("Bienvenido a mi Servidor en node.js"));

router.post("/create-order", createOrder);

//router.post("/webhook", receiveWebhook);

router.get("/success", (req, res) => res.send("Success"));

router.get("/pending", (req, res) => res.send("Pending"));

router.get("/failure", (req, res)=>res.send("Ocurrio un error tu compra no puedo realizarse"));

router.post("/products", (req, res)=>{
         const product = productSchema(req.body)
         product
          .save()
          .then((data)=> res.json(data))
          .catch(error=> res.json({ message: error}))
});

router.get("/products", (req, res)=>{
  productSchema
  .find()
  .then((data)=> res.json(data))
  .catch(error=> res.json({ message: error}))
});



export default router;