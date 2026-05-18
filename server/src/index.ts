import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"

import dotenv from "dotenv"
dotenv.config()
import { connectDb } from "./config/db"

import authRouter from "./routes/auth.router"
import addTeacher  from "./routes/addteacher.router"

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieparser())
connectDb()



app.use("/" , authRouter)      
app.use("/" , addTeacher)



app.listen(3131 ,  ()=>{
   console.log("server is running")
})