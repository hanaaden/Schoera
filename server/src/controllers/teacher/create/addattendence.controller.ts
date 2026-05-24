import {CustomRequest} from "../../../types/customRequest";
import {Response} from "express";
import {pool} from "../../../config/db";
import { addAttendenceSchema } from "../../../validations/validation";

export const addAttendence = async(req: CustomRequest , res: Response) => {
    const user = req.user?.id
    const result = addAttendenceSchema.safeParse(req.body)
    if (!result.success) {
        return res.status(400).json({error : result.error.format()})
    }
    const {classCourseId , studentId , attendanceDate , status} = result.data
      const teacherChecker = await pool.query("SELECT * FROM class_course WHERE class_courseid = $1 AND teacher_id = $2" , [classCourseId , user])
    if(teacherChecker.rows.length == 0){
        return res.status(403).json({error : "forbidden"})
    }
    const checker =  await pool.query("SELECT * FROM attendance WHERE class_courseid = $1 AND student_id = $2 AND attendance_date = $3" , [classCourseId , studentId , attendanceDate])
    if(checker.rows.length > 0){
        return res.status(400).json({error : "attendance already exists"})
    }
  
    const studentChecker = await pool.query("SELECT * FROM enrollment WHERE class_courseid = $1 AND student_id = $2" , [classCourseId , studentId])
    if(studentChecker.rows.length == 0){
        return res.status(404).json({error : "student not found"})
    }

    await pool.query("INSERT INTO attendance (class_courseid , student_id , attendance_date , status) VALUES ($1 , $2 , $3 , $4)" , [classCourseId , studentId , attendanceDate , status])
    res.status(200).json({message : "attendance added successfully"})
}