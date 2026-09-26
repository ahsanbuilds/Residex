import express from 'express';
import {createIssue, getIssueById, getIssues} from '../controllers/issueController.js';
import {protect} from '../middleware/auth.js';
import { updateIssueStatus } from '../controllers/issueController.js';

const router = express.Router();
router.post('/' , protect, createIssue);
router.get('/', protect , getIssues);
router.get('/:id', protect , getIssueById);
router.patch('/:id/status',protect,updateIssueStatus);


export default router;