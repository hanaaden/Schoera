import { Response} from 'express'
import {pool} from "../../../config/db";
import CustomRequest from '../../../types/customRequest';
import { AddFacultySchema } from '../../../validations/validation'

export const addFaculty = async (req:CustomRequest , res:Response) => {
    try {
        const userRole = req.user?.role
        if(!userRole){
            return res.status(401).json({error : "Unauthorized"})
        }
        if(userRole == "admin"){
            const result = AddFacultySchema.safeParse(req.body)
            if (!result.success) {
                return res.status(400).json({error : result.error.format()})
            }
            const {name} = result.data
            await pool.query("INSERT INTO faculty (faculty_name) VALUES ($1)" , [name])
            res.status(200).json({message : "faculty added successfully"})
        }else{
            return res.status(403).json({error : "forbidden"})
        }
    } catch (error) {
        res.status(404).json({error : "error where adding faculty"})
    }

}