import express from "express";
import { ENV } from "./Configs/env";
import { clerkMiddleware, ClerkMiddleware } from "@clerk/express";
const app = express()

app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.send({message:"Hola Mundo"});
})

app.listen(ENV.PORT,()=>{
    console.log('Listening');
    
})