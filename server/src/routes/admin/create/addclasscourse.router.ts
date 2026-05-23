import { Router } from "express";
import { addClassCourse } from "../../../controllers/Admin/create/addclasscorse.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";


const router = Router();

router.post("/addclasscourse",authMiddleware, addClassCourse);

export default router;