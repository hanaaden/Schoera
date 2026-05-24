import { PassThrough } from "node:stream";
import {email, string, z} from "zod"

export const SignupSchema = z.object({
    email : z.string().email("invalid email address"),
    username : z.string().min(3 , "username must be at least 3 characters long"),
    password : z.string().min(6 , "password must be at least 6 characters long"),
})

export const LoginSchema = z.object({
    email : z.string().email("invalid email address"),
    password : z.string().min(6 , "password must be at least 6 characters long"),
})

export const AddTeacherSchema = z.object({
    email : z.string().email("invalid email address"),
    username : z.string().min(3 , "username must be at least 3 characters long"),
    password : z.string().min(6 , "password must be at least 6 characters long"),
})

export const AddFacultySchema = z.object({
    name : z.string().min(3 , "faculty name must be at least 3 characters long")
})
export const AddClassSchema = z.object({
    className : z.string().min(2, "class name must be at least 3 characters long"),
    facultyId : z.number()
})
export const AddStudentSchema = z.object({
    email : z.string().email("invalid email address"),
    roll_number : z.string().min(1 , "roll number is required"),
    shift : z.string().min(1 , "shift is required"),
    classId : z.number(),
    year : z.number()
})
export const addcourseSchema = z.object({
    courseName : z.string().min(3 , "course name must be at least 3 characters long"),
    facultyId: z.number()
})

export const addclasscourseSchema = z.object({
    courseId : z.number(),
    classId : z.number(),
    teacherId : z.number()
})

export const addEventSchema = z.object({
    eventName : z.string().min(3 , "event name must be at least 3 characters long"),
    eventDate : z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    description : z.string().optional()
})

export const AddTimeTableSchema = z.object({
    classCourseId : z.number(),
    day : z.string().min(3 , "day must be at least 3 characters long"),
    startTime : z.string().refine((time) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time), {
        message: "Invalid time format (HH:mm)",
    }),
    endTime : z.string().refine((time) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time), {
        message: "Invalid time format (HH:mm)",
    }),
})

export const addenrollmentSchema = z.object({
    classCourseId : z.number(),
})

export const addAttendenceSchema = z.object({
    classCourseId : z.number(),
    studentId : z.number(),
    attendanceDate : z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    status : z.enum(["present", "absent", "late"])
    
})