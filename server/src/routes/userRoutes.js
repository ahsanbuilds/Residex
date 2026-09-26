import express from 'express';
import { authorize, protect } from '../middleware/auth.js';
import { createStaffUser } from '../controllers/userController.js';

const router = express.Router();
router.post('/',protect, authorize('admin'),createStaffUser);
export default router;