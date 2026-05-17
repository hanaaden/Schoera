import {Request , Response} from "express"
import {pool} from "../config/db"
import { LoginSchema , SignupSchema } from "../validations/validation"

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signup = async(req: Request , res :Response)=>{
    try {
        const result = SignupSchema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({error : result.error.format()})
        }

             const {email , username , password} = result.data
             const hashed = await bcrypt.hash(password, 10)
             await pool.query("INSERT INTO users (email , username , password , role) VALUES ($1 , $2 , $3 , $4)" , [email , username , hashed , "student"])
             res.status(200).json({message : "user created successfully"})  

        
    } catch (error) {
        res.status(500).json({error : "error when creating user"})
    }

}

export const login = async(req: Request , res: Response)=>{
        const result = LoginSchema.safeParse(req.body)
        if (!result.success) {
            return res.status(400).json({error : result.error.format()})
        }

        const {email , password} = result.data

        try {
            const user = await pool.query("SELECT * FROM users WHERE email = $1" , [email])
            if (user.rows.length === 0) {
                
                return res.status(400).json({error : "invalid credentials"})

            }

            const valid  = await bcrypt.compare(password , user.rows[0].password)
            if (!valid) {
                return res.status(400).json({error : "invalid credentials"})
            }

            const token = jwt.sign({id : user.rows[0].user_id, role: user.rows[0].role}, process.env.JWT_SECRET as string, {expiresIn: "1d"});
                 res.cookie("token" , token , {
              httpOnly: true,
              secure: false,
              sameSite: "lax",
              maxAge: 24 * 60 * 60 * 1000
        })
        res.status(200).json({ message: "Logged in successfully" })
        } catch (error) {
            console.log(error)
            res.status(500).json({error: "error when logging in"})
        }
}
