import mercadopage from "mercadopago";
import { MERCADOPAGO_API_KEY } from "../src/config.js";

const boughtProducts = [];

export const createOrder = async (req, res) => {
  mercadopage.configure({
    access_token: MERCADOPAGO_API_KEY,
  });

  req.body.forEach(element => { //Arreglamos los productos que se van a comprar para 
                                //adaptarlos a las preferencias de mercado Pago.
    delete element.id;
    delete element.stock;
    const auxname=element.name;
    const auxPrice = element.price;
    delete element.name;
    delete element.price;
    element.title = auxname;
    element.unit_price = auxPrice;
    boughtProducts.push(element);
  });
  
  
  
  try {
    const result = await mercadopage.preferences.create({
      
      items: boughtProducts, //Asignamos a la propiedad Items los productos que el cliente comprara;
      notification_url: "https://3d63-2806-10be-7-29a8-211e-85df-fd0c-1624.ngrok.io/webhook",
      back_urls: {
        success: "http://localhost:4000/",
        pending: "http://localhost:4000/",
        failure: "http://localhost:4000/",
      },
    });

    //console.log(result);

    res.json(result.body);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
  
  //console.log(req.body);
  
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*
export const receiveWebhook = async (req, res) => {
  try {
    const payment = req.query;
    console.log(payment);
    if (payment.type === "payment") {
      const data = await mercadopage.payment.findById(payment["data.id"]);
      console.log(data);
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
*/


