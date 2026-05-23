import { Router } from "express";
import { addTimeTable } from "../../../controllers/Admin/create/addtimetable.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";   

const router = Router();

router.post("/addtimetable", authMiddleware, addTimeTable);     
export default router;