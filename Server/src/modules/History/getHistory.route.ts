import { Router } from 'express';
import { saveToHistory, getHistory } from '../../modules/History/saveToHistory.service';

export const historyRouter = Router();

historyRouter.get('/', async (req, res) => {
  try {
    const history = await getHistory();
    res.json(history);
  } catch (error) {
    res.status(500).send('Error retrieving history');
  }
});