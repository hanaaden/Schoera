import { Router } from "express";

const router = Router()

import { addTeacher } from "../../../controllers/Admin/create/addteacher.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";

router.post("/addteacher" , authMiddleware , addTeacher)

export default router
