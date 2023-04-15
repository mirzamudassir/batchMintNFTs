import { Relayer } from 'defender-relay-client';
import dotenv from "dotenv";
dotenv.config()
const relayer = new Relayer({apiKey: process.env.RELAY_API_KEY, apiSecret: process.env.RELAY_SECRET_KEY});

const tx = await relayer.sendTransaction({
  to, value, data, gasLimit, speed: 'fast'
});