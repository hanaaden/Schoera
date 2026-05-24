import {Router} from "express";
import { addAttendence } from "../../../controllers/teacher/create/addattendence.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { roleChecker } from "../../../middlewares/rolechecker";

const router = Router();

router.post("/addattendence", authMiddleware,roleChecker(["teacher"]), addAttendence);

export default router;