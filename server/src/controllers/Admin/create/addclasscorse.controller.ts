import {Response} from 'express';
import {pool} from "../../../config/db";
import CustomRequest from '../../../types/customRequest';
import { addclasscourseSchema} from '../../../validations/validation';

export const addClassCourse = async (req: CustomRequest , res: Response) => {
    try {
        const userRole = req.user?.role
        if(!userRole){
            return res.status(401).json({error : "Unauthorized"})
        }
        if(userRole == "admin"){
            const result = addclasscourseSchema.safeParse(req.body)
            if (!result.success) {
                return res.status(400).json({error : result.error.format()})
            }
            const {classId , courseId , teacherId} = result.data
              const classCheck = await pool.query("SELECT * FROM classes WHERE class_id = $1" , [classId])
        if(classCheck.rows.length == 0){
            return res.status(404).json({error : "class not found"})
        }
          const courseCheck = await pool.query("SELECT * FROM course WHERE course_id = $1" , [courseId])
        if(courseCheck.rows.length == 0){
            return res.status(404).json({error : "course not found"})
        }
          const teacherCheck = await pool.query("SELECT * FROM teacher WHERE teacher_id = $1" , [teacherId])
        if(teacherCheck.rows.length == 0){
            return res.status(404).json({error : "teacher not found"})
        }
        const alreadyAdded = await pool.query("SELECT * FROM class_course WHERE class_id = $1 AND course_id = $2 AND teacher_id = $3" , [classId , courseId , teacherId])
        if(alreadyAdded.rows.length > 0){
            return res.status(400).json({error : "course already added to class"})
        }
            await pool.query("INSERT INTO class_course (class_id , course_id , teacher_id) VALUES ($1 , $2 , $3)" , [classId , courseId , teacherId])
            res.status(200).json({message : "class course added successfully"})
        }else{
            return res.status(403).json({error : "forbidden"})
        }
    } catch (error) {
        res.status(404).json({error : "error where adding class course"})
    }
}   