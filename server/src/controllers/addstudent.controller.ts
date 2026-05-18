import {Response} from "express"
import {pool} from "../config/db"
import CustomRequest from "../types/customRequest"
import { AddStudentSchema } from "../validations/validation"

export const addStudent = async(req: CustomRequest , res: Response) => {
    try {
        const userRole = req.user?.role
        if(!userRole){
            return res.status(401).json({error : "Unauthorized"})
        }
        if (userRole == "admin"){
            const result = AddStudentSchema.safeParse(req.body)
            if (!result.success) {
                return res.status(400).json({error : result.error.format()})
            }
            const {email , roll_number, shift , classId , year} = result.data
               

            const user = await pool.query("SELECT * FROM users WHERE email = $1" , [email])
            if(user.rows.length == 0){
                return res.status(404).json({error : "student not found"})
            }
            const userId = user.rows[0].user_id
            const roleCheck = await pool.query("SELECT * FROM users WHERE user_id = $1 AND role = $2" , [userId , "student"])
            if(roleCheck.rows.length == 0){
                return res.status(400).json({error : "user is not a student"})
            }
            const classCheck = await pool.query("SELECT * FROM classes WHERE class_id = $1" , [classId])
            if(classCheck.rows.length == 0){
                return res.status(404).json({error : "class not found"})
            }
            const registered = await pool.query("SELECT * FROM student WHERE user_id = $1" , [userId])
            if(registered.rows.length > 0){
                return res.status(400).json({error : "student already registered"})
            }else{
            await pool.query("INSERT INTO student (user_id, roll_number, shift , class_id , year) VALUES ($1 , $2 , $3 , $4 , $5 )" , [userId, roll_number, shift , classId , year])
            res.status(200).json({message : "student added successfully"})
            }
        }
    } catch (error) {
        res.status(400).json({error : "error where adding student"})
    }
}