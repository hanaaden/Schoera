import express from "express"
import cors from "cors"

import dotenv from "dotenv"
dotenv.config()
import { connectDb } from "./config/db"

import authRouter from "./routes/auth.router"

const app = express()
app.use(cors())
app.use(express.json())
connectDb()



app.use("/" , authRouter)      




app.listen(3131 ,  ()=>{
   console.log("server is running")
})