import { Router } from "express";
import { addCourse } from "../../../controllers/Admin/create/addcourse.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";


const router = Router();

router.post("/addcourse",authMiddleware, addCourse);

export default router;