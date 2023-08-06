import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
   name: {
        type: String,
        required: true,    
   },
   phone_number: {
       type: Number,
       required: true      
   },
   address: {
       type: String,
       required: true      
   }
});

export default mongoose.model('client', clientSchema);