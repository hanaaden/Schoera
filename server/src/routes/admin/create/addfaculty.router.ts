import Router from 'express';
import { addFaculty } from '../../../controllers/Admin/create/addfaculty.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';

const router = Router() 
router.post("/addfaculty" ,authMiddleware , addFaculty)

export default router