import CustumRequest  from "../../../types/customRequest";
import { Response } from "express";
import {pool} from "../../../config/db";

import {addenrollmentSchema} from "../../../validations/validation";

export const addEnrollment = async (req: CustumRequest , res: Response) => {
    try {
       
        const user = req.user?.id
       
       
            const result = addenrollmentSchema.safeParse(req.body)
            if (!result.success) {
                return res.status(400).json({error : result.error.format()})
            }
            const classCourseId = result.data.classCourseId
            const studentId= await pool.query("SELECT student_id FROM student WHERE user_id = $1" , [user])
              if(studentId.rows.length == 0){
                return res.status(404).json({error : "student not found"})
            }
            const checkEnrollment = await pool.query("SELECT * FROM enrollment WHERE class_courseid = $1 AND student_id = $2" , [classCourseId , studentId.rows[0].student_id])
            if(checkEnrollment.rows.length > 0){
                return res.status(400).json({error : "already enrolled"})
            }
          
            const checkClassCourse = await pool.query("SELECT * FROM class_course WHERE class_courseid = $1" , [classCourseId])
            if(checkClassCourse.rows.length == 0){
                return res.status(404).json({error : "class course not found"})
            }
        
            const checkStudentClass = await pool.query("SELECT * FROM student s JOIN class_course cc ON s.class_id = cc.class_id WHERE cc.class_courseid = $1 AND s.student_id = $2" , [classCourseId , studentId.rows[0].student_id])
            if(checkStudentClass.rows.length == 0){
                return res.status(400).json({error : "student not in the class"})
            }
            await pool.query("INSERT INTO enrollment (class_courseid , student_id) VALUES ($1 , $2)" , [classCourseId , studentId.rows[0].student_id])
            return res.status(200).json({message : "enrollment added successfully"})
            } catch (error) {
        res.status(404).json({error : "error where adding enrollment"})
    }
}