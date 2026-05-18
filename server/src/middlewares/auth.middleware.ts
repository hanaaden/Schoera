import {Request , Response ,NextFunction} from "express"
import jwt from "jsonwebtoken"
import CustomRequest from "../types/customRequest"

export const authMiddleware = (req: CustomRequest , res: Response , next: NextFunction)=>{
    const token = req.cookies?.token
    if(!token){
        return res.status(401).json({error : "no token" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {id:number , role: string}
        req.user = {id: decoded.id , role: decoded.role}
        next()
    } catch (error) {
        return res.status(401).json({error : "Unauthorized"})
    }
}