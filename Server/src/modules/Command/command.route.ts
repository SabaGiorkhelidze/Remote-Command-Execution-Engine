import { Router } from 'express';
import { commandController } from '../../container';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();
router.post('/execute-command', authMiddleware, commandController.runCommand);
export default router;
