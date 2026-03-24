import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { ENV } from "../Configs/env";
import { Pool } from 'pg';

if(!ENV.DB_URL){
    throw new Error('Database URL not found');
}
let pool = new Pool({connectionString:ENV.DB_URL})
pool.on('connect',()=>{
    console.log('Database connected successfully');
    
})
pool.on('error',()=>{
    console.log('Database not connected');
    
})

export const db = drizzle({client:pool,schema})