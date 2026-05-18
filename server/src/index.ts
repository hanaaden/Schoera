import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"

import dotenv from "dotenv"
dotenv.config()
import { connectDb } from "./config/db"

import authRouter from "./routes/auth.router"
import addTeacher  from "./routes/addteacher.router"
import addFaculty from "./routes/addfaculty.router"
import addClass from "./routes/addclass.router"
import addStudent from "./routes/addstudent.router"
import addCourse  from "./routes/addcourse.router"
import addClassCourse from "./routes/addclasscourse.router"
import addEvent from "./routes/addevent.router"
import addTimeTable from "./routes/addtimetable.router"
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieparser())
connectDb()



app.use("/" , authRouter)      
app.use("/" , addTeacher)
app.use("/" , addFaculty)
app.use("/" , addClass)
app.use("/" , addStudent)
app.use("/", addCourse)
app.use("/", addClassCourse)
app.use("/", addEvent)
app.use("/", addTimeTable)

app.listen(3131 ,  ()=>{
   console.log("server is running")
})