import dotnet from "dotenv"
dotnet.config();

export const ENV ={
    PORT:process.env.PORT,

DB_URL:process.env.DB_URL,
NODE_ENV:process.env.NODE_ENV
}