import { Router } from 'express';
import { runCommand } from './command.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';


const router = Router()

router.post('/execute', authMiddleware, runCommand)
// router.get('/history', authMiddleware, getHistory);

export default router