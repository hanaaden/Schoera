import CustumRequest  from "../../../types/customRequest";
import { Response } from "express";
import {pool} from "../../../config/db";

import {addenrollmentSchema} from "../../../validations/validation";

export const addEnrollment = async (req: CustumRequest , res: Response) => {
    try {
        const userRole = req.user?.role
        const user = req.user?.id
        if(!userRole){
            return res.status(401).json({error : "Unauthorized"})
        }
        if(userRole == "student"){
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
        
            const checkStudentClass = await pool.query("SELECT class_id FROM student WHERE student_id = $1" , [studentId.rows[0].student_id ])
    const checkclassId = await pool.query("SELECT class_id FROM class_course WHERE class_courseid = $1" , [classCourseId])
    if(checkStudentClass.rows.length == 0){
        return res.status(404).json({error : "student not registered in any class"})
    }
    if(checkclassId.rows.length == 0){
        return res.status(404).json({error : "class course not found"})
    }
    if(checkStudentClass.rows[0].class_id != checkclassId.rows[0].class_id){
        return res.status(400).json({error : "enrollement not allowed if you are not registered in the class"})
    }
            await pool.query("INSERT INTO enrollment (class_courseid , student_id) VALUES ($1 , $2)" , [classCourseId , studentId.rows[0].student_id])
            return res.status(200).json({message : "enrollment added successfully"})
        }else{
            return res.status(403).json({error : "forbidden"})
        }
    } catch (error) {
        res.status(404).json({error : "error where adding enrollment"})
    }
}