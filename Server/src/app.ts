import express from 'express';
import commandRouter from './modules/Command/command.route';
import historyRouter from './modules/History/history.route';
import gitRouter from './modules/Git/git.route'
import dockerRouter from './modules/docker/docker.route';

const app = express();

app.use(express.json());

app.use('/api/ssh', commandRouter);
app.use('/api/getCommandHistory', historyRouter);
app.use('/api/git', gitRouter)
app.use('/api/docker', dockerRouter)

export default app;