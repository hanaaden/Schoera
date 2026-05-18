
import {Response} from 'express';
import {pool} from "../config/db";
import CustomRequest from '../types/customRequest';
import { addcourseSchema } from '../validations/validation';

export const addCourse = async (req: CustomRequest , res: Response) => {
    try {
            const userRole = req.user?.role
        if(!userRole){
            return res.status(401).json({error : "Unauthorized"})
        }
    
        if(userRole == "admin"){
               const result = addcourseSchema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({error : result.error.format()})
        }
        const {courseName , facultyId} = result.data
        const facultyCheck = await pool.query("SELECT * FROM faculty WHERE faculty_id = $1" , [facultyId])
        if(facultyCheck.rows.length == 0){
            return res.status(404).json({error : "faculty not found"})
        }
 
        const courseCheck = await pool.query("SELECT * FROM course WHERE course_name = $1 AND faculty_id = $2" , [courseName , facultyId])
        if(courseCheck.rows.length > 0){
            return res.status(400).json({error : "course already exists"})
        }
       await pool.query("INSERT INTO course (course_name , faculty_id) VALUES ($1 , $2)" , [courseName , facultyId])
        res.status(200).json({message : "course added successfully"})
        
     
    }else{
          return res.status(403).json({error : "forbidden"})
    }
     
    } catch (error) {
        res.status(500).json({error : "internal server error"})
    }
}