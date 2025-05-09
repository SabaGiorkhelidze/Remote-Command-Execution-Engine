import express from 'express';
import router from './modules/Command/command.route';

const app = express();

app.use(express.json());

// Route registration
app.use('/api/command', router);

export default app;