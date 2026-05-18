import { Router } from "express";
import { addStudent } from "../controllers/addstudent.controller";
import { authMiddleware } from "../middlewares/auth.middleware";


const router = Router();

router.post("/addstudent",authMiddleware, addStudent);

export default router;