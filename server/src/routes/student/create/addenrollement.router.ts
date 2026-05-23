import {Router} from "express";
import { addEnrollment } from "../../../controllers/student/create/addenrollemt.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";

const router = Router();

router.post("/addenrollment", authMiddleware, addEnrollment);

export default router;