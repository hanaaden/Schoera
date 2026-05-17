import { PassThrough } from "node:stream";
import {z} from "zod"

export const SignupSchema = z.object({
    email : z.string().email("invalid email address"),
    username : z.string().min(3 , "username must be at least 3 characters long"),
    password : z.string().min(6 , "password must be at least 6 characters long"),
})

export const LoginSchema = z.object({
    email : z.string().email("invalid email address"),
    password : z.string().min(6 , "password must be at least 6 characters long"),
})