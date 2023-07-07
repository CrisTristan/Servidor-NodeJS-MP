const carrito=[];
const productsArr = []; //Productos de la tienda
const checkout = document.getElementById('checkout');
let total = 0;

const addCarrito = (idProduct)=>{
   productsArr.forEach(element => {
       if(element._id === idProduct){
           total += element.price;
          carrito.push(element);
       }
   });
   checkout.innerHTML = `Total ${total}`;
   repeatedProduct();
}

const repeatedProduct = ()=>{
    repeated = false;
    count = 1;
    for (var i = 0; i < carrito.length; i++) {
        for (var j = 0; j < carrito.length; j++) {
            if (carrito[i] === carrito[j] && i != j) { //revisamos que i sea diferente de j, para que no compare el mismo elemento exacto.
                repeated=true;
                count++;
             }
         }
         if(repeated){
         carrito[i].quantity=count;
         count=1;
         repeated=false;
         }else{
            carrito[i].quantity=1; 
         }
     }
}

const deleteRepeatProduct = ()=>{

    for (var i = 0; i < carrito.length; i++) {
        for (var j = 0; j < carrito.length; j++) {
            if (carrito[i] === carrito[j] && i != j) {
               carrito.splice(j,1);
             }
         }
     }
     return carrito;
}


const getProducts = async()=>{
    const products = await (await fetch("/products")).json();
    /*
    .then(res => res.json()) //esta linea convierte respuesta en un JSON
    .then(json => console.log(json)) //esta linea imprime los productos
    .catch(err => console.log(err));
    */
    products.forEach(element => {
        productsArr.push(element);
    });
    console.log(productsArr)
}

const pay = async()=>{
    carro=deleteRepeatProduct();
    const response = await fetch("/create-order", {
        method: 'POST',
        body: JSON.stringify(carro),
        headers: {
            "Content-Type": "Application/json"     
        }    
    });
    const data = await response.json();
    console.log(data);
    window.location.href = data.init_point;
}

checkout.addEventListener('click', async()=>{
    if(carrito.length === 0){
       alert("no tiene productos en el carrito");
    }else{
      pay();
    }
});

getProducts();

