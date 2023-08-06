import mercadopage from "mercadopago";
import { MERCADOPAGO_API_KEY } from "../src/config.js";

let boughtProducts = [];

export const createOrder = async (req, res) => {
  
   boughtProducts=[];
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
      notification_url: "https://viverolastorres.onrender.com/",
      back_urls: {
        success: "https://viverolastorres.onrender.com/", //Cambiar las URL de retorno
        pending: "https://viverolastorres.onrender.com/",  
        failure: "https://viverolastorres.onrender.com/",
      },
    });

    console.log(result);

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


