import {Response} from 'express';

import {pool} from "../../../config/db";
import CustomRequest from '../../../types/customRequest';
import { AddClassSchema, AddFacultySchema } from '../../../validations/validation';

export const addClass = async (req: CustomRequest , res: Response) => {
    try {
        const userRole = req.user?.role
        if(!userRole){
            return res.status(401).json({error : "Unauthorized"})
        }
        if(userRole == "admin"){
            const result = AddClassSchema.safeParse(req.body)
            if (!result.success) {
                return res.status(400).json({error : result.error.format()})
            }
            const {className , facultyId} = result.data
              const facultyCheck = await pool.query("SELECT * FROM faculty WHERE faculty_id = $1" , [facultyId])
        if(facultyCheck.rows.length == 0){
            return res.status(404).json({error : "faculty not found"})
        }
            await pool.query("INSERT INTO classes (class_name , faculty_id) VALUES ($1 , $2)" , [className , facultyId])
            res.status(200).json({message : "class added successfully"})
        }else{
            return res.status(403).json({error : "forbidden"})
        }
    } catch (error) {
        res.status(404).json({error : "error where adding class"})
    }
}