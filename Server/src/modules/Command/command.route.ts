import { Router } from 'express';
import { CommandController } from './command.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();
const commandController = new CommandController();


router.post('/execute', authMiddleware, commandController.runCommand);

export default router;
