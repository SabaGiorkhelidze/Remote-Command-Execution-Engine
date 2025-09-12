import express from 'express';
import commandRouter from './modules/Command/command.route';
import { historyRouter } from './modules/History/history.route';
import gitRouter from './modules/Git/git.route'


const app = express();

app.use(express.json());

app.use('/api/command', commandRouter);
app.use('/api/getCommandHistory', historyRouter);
app.use('/api/git-info', gitRouter)

export default app;