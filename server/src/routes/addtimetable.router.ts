import { Router } from "express";
import { addTimeTable } from "../controllers/addtimetable.controller";
import { authMiddleware } from "../middlewares/auth.middleware";   

const router = Router();

router.post("/addtimetable", authMiddleware, addTimeTable);     
export default router;