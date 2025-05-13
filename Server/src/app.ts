import express from 'express';
import router from './modules/Command/command.route';
import { historyRouter } from './modules/History/getHistory.route';
const app = express();

app.use(express.json());

app.use('/api/command', router);
app.use('/api/getCommandHistory', historyRouter);

export default app;