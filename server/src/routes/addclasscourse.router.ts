import { Router } from "express";
import { addClassCourse } from "../controllers/addclasscorse.controller";
import { authMiddleware } from "../middlewares/auth.middleware";


const router = Router();

router.post("/addclasscourse",authMiddleware, addClassCourse);

export default router;