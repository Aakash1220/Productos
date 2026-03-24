import express from "express";
import cors from 'cors'
import { ENV } from "./Configs/env";
import { clerkMiddleware, ClerkMiddleware } from "@clerk/express";
const app = express()
app.use(cors({origin:ENV.FRONTEND_URL}))
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.send({message:"Hola Mundo"});
})
console.log(ENV)
app.listen(ENV.PORT,()=>{
    console.log('Listening at',ENV.PORT);
    
})