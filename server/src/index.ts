import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"

import dotenv from "dotenv"
dotenv.config()
import { connectDb } from "./config/db"

import authRouter from "./routes/auth.router"
import addTeacher  from "./routes/admin/create/addteacher.router"
import addFaculty from "./routes/admin/create/addfaculty.router"
import addClass from "./routes/admin/create/addclass.router"
import addStudent from "./routes/admin/create/addstudent.router"
import addCourse  from "./routes/admin/create/addcourse.router"
import addClassCourse from "./routes/admin/create/addclasscourse.router"
import addEvent from "./routes/admin/create/addevent.router"
import addTimeTable from "./routes/admin/create/addtimetable.router"
import addEnrollment  from "./routes/student/create/addenrollement.router"
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
app.use("/" , addEnrollment)

app.listen(3131 ,  ()=>{
   console.log("server is running")
})