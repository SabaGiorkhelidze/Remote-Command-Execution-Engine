import { Router } from 'express';
import { historyController } from '../../container';

const historyRouter = Router();

historyRouter.get('/', historyController.runHistoryService);

export default historyRouter;