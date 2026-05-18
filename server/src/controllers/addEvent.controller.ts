import { Response } from "express";
import {pool} from "../config/db"
import CustomRequest from "../types/customRequest";
import { addEventSchema } from "../validations/validation";

export const addEvent = async (req: CustomRequest , res: Response) => {
    try {
        const userRole = req.user?.role
        if(!userRole){
            return res.status(401).json({error : "Unauthorized"})
        }
        if(userRole == "admin"){
            const result = addEventSchema.safeParse(req.body)
            if (!result.success) {
                return res.status(400).json({error : result.error.format()})
            }
            const {eventName , eventDate , description} = result.data
            const eventCheck = await pool.query("SELECT * FROM event WHERE event_name = $1 AND event_date = $2" , [eventName , eventDate])
            if(eventCheck.rows.length > 0){
                return res.status(400).json({error : "event already exists"})
            }
            await pool.query("INSERT INTO event (event_name , event_date , description) VALUES ($1 , $2 , $3)" , [eventName , eventDate , description])
            res.status(200).json({message : "event added successfully"})
        }else{
            return res.status(403).json({error : "forbidden"})
        }
    } catch (error) {
        res.status(404).json({error : "error where adding event"})
    }
}   