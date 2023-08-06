import {config} from 'dotenv'
config();
export const PORT = process.env.PORT;
export const MERCADOPAGO_API_KEY = process.env.MERCADOPAGO_API_KEY;
export const MONGODB_URI= process.env.MONGODB_URI;