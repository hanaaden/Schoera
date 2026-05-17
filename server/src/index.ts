import express from "express"
import cors from "cors"

import dotenv from "dotenv"
dotenv.config()
import { connectDb } from "./config/db"

const app = express()
app.use(cors())
app.use(express.json())


connectDb()

app.listen(3131 ,  ()=>{
   console.log("server is running")
})