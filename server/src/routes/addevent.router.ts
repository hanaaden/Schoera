import { Router } from "express";
import { addEvent } from "../controllers/addEvent.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
router.post("/addevent" ,authMiddleware , addEvent)

export default router;