import { Router } from 'express';
import { historyService } from '../../container';

const historyRouter = Router();

historyRouter.get('/', async (req, res) => {
  try {
    const history = await historyService.getHistory();
    res.status(200).json({ history });
  } catch (error: any) {
    res.status(500).json({ message: 'Error retrieving history', error: error.message });
  }
});
export default historyRouter;