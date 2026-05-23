import { Router } from "express";


import { authMiddleware } from "../../../middlewares/auth.middleware";
import { addClass } from "../../../controllers/Admin/create/addclass.controller";

const router = Router()


router.post("/addclass" ,authMiddleware , addClass)

export default router