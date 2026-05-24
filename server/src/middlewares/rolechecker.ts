import { NextFunction } from "express"
import CustomRequest from "../types/customRequest"
import { addenrollmentSchema } from "../validations/validation"
import { Response } from "express"


export const roleChecker =(rolearray: string[]) => {
    return (req: CustomRequest , res: Response , next: NextFunction) => {
        const userRole = req.user?.role
        if(!userRole){
            return res.status(401).json({error : "Unauthorized"})
        }
        if(!rolearray.includes(userRole)){
            return res.status(403).json({error : "forbidden"})
        }
        next()
    }
}       
