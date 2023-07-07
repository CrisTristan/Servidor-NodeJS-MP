import mongoose from "mongoose";

const productSchema = mongoose.Schema({
   name: {
        type: String,
        required: true,    
   },
   price: {
       type: Number,
       required: true      
   },
   currency_id: {
       type: String,
       required: true      
   },
   stock: {
       type: Number,
       required: true      
   }
});

export default mongoose.model('product', productSchema);