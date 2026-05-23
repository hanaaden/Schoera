import {Request , Response} from "express"
import {pool} from "../../../config/db";
import CustomRequest from '../../../types/customRequest';
import { AddTeacherSchema } from "../../../validations/validation"
import bcrypt from "bcrypt"

export const addTeacher = async(req: CustomRequest, res: Response)=>{
 try {
    
        const userRole = req.user?.role
        if(!userRole){
            return res.status(401).json({error : "Unauthorized"})
        }
        if(userRole == "admin"){
   
      const result = AddTeacherSchema.safeParse(req.body)
        if (!result.success) {
        return res.status(400).json({error : result.error.format()})
    }
    
    const {email , username , password} = result.data
    const hashed = await bcrypt.hash(password , 10)
    await pool.query("BEGIN")

    const user = await pool.query("INSERT INTO users (email , username , password , role) VALUES ($1 , $2 , $3 , $4) RETURNING *" , [email , username , hashed , "teacher"])
    await pool.query("INSERT INTO teacher (user_id) VALUES ($1)" , [user.rows[0].user_id])
        await pool.query("COMMIT")     
    res.status(200).json({message : "teacher added successfully"})
}else{
   return res.status(403).json({error : "forbidden"})
}
 } catch (error) {
    await pool.query("ROLLBACK")
    res.status(500).json({error : "error when adding teacher"})

 }
}