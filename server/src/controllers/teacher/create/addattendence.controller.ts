import {CustomRequest} from "../../../types/customRequest";
import {Response} from "express";
import {pool} from "../../../config/db";
import { addAttendenceSchema } from "../../../validations/validation";

export const addAttendence = async(req: CustomRequest , res: Response) => {
    const user = req.user?.id
    console.log(user)
    const result = addAttendenceSchema.safeParse(req.body)
    if (!result.success) {
        return res.status(400).json({error : result.error.format()})
    }
    const {classCourseId  , attendanceDate , records} = result.data
    const teacher = await pool.query(
  "SELECT teacher_id FROM teacher WHERE user_id = $1",
  [user]
)


 const teacher_id = teacher.rows[0].teacher_id
      const teacherChecker = await pool.query("SELECT * FROM class_course WHERE class_courseid = $1 AND teacher_id = $2" , [classCourseId , teacher_id])
    if(teacherChecker.rows.length == 0){
        return res.status(403).json({error : "forbidden"})
    }

    
   for(const record of records){
    const {studentId , status} = record

    const studentChecker = await pool.query("SELECT * FROM enrollment WHERE class_courseid = $1 AND student_id = $2" , [classCourseId , studentId])
    if(studentChecker.rows.length == 0){
        return res.status(404).json({error : "student not found"})
    };
    const attendanceChecker = await pool.query("SELECT * FROM attendance WHERE class_courseid = $1 AND student_id = $2 AND attendance_date = $3" , [classCourseId , studentId , attendanceDate])
    
    if(attendanceChecker.rows.length > 0){
        await pool.query("UPDATE attendance SET status = $1 WHERE class_courseid = $2 AND student_id = $3 AND attendance_date = $4" , [status , classCourseId , studentId , attendanceDate])
    }else{
     await pool.query("INSERT INTO attendance (class_courseid , student_id, attendance_date , status) VALUES ($1 , $2 , $3 , $4)" , [classCourseId , studentId , attendanceDate , status])
       
    }

  }
    res.status(200).json({message : "attendance added successfully"})

}