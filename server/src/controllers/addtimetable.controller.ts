import { Response } from "express";
import customRequest from "../types/customRequest"
import {pool} from "../config/db"
import { AddTimeTableSchema } from "../validations/validation";
export const addTimeTable = async (req: customRequest, res: Response) => {
    try {
        const userRole = req.user?.role
        if(!userRole){
            return res.status(401).json({error : "Unauthorized"})
        }
        if(userRole == "admin"){
            const result = AddTimeTableSchema.safeParse(req.body)
            if (!result.success) {
                return res.status(400).json({error : result.error.format()})
            }
            const {classCourseId , day , startTime , endTime} = result.data
            const classCourseCheck = await pool.query("SELECT * FROM class_course WHERE class_courseid = $1" , [classCourseId])
            if(classCourseCheck.rows.length == 0){
                return res.status(404).json({error : "class course not found"})
            }
            const timeTableCheck = await pool.query("SELECT * FROM timetable WHERE class_courseid = $1 AND day = $2 AND ((start_time <= $3 AND end_time > $3) OR (start_time < $4 AND end_time >= $4) OR (start_time >= $3 AND end_time <= $4))" , [classCourseId , day , startTime , endTime])
            if(timeTableCheck.rows.length > 0){
                return res.status(400).json({error : "timetable already added"})
            }
            if(startTime >= endTime){
                return res.status(400).json({error : "start time must be less than end time"})
            }
            
            await pool.query("INSERT INTO timetable (class_courseid , day , start_time , end_time) VALUES ($1 , $2 , $3 , $4)" , [classCourseId , day , startTime , endTime])
            res.status(200).json({message : "timetable added successfully"})
        }else{
            return res.status(403).json({error : "forbidden"})
        }
    } catch (error) {
        res.status(500).json({error : "internal server error"})
    }   
};


