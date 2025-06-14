import dotenv from 'dotenv';
import app from './src/app';
import express from 'express';

import { AppDataSource } from './src/config/data-source';
import { generateToken } from './src/middlewares/token.middleware';


app.use(express.json())


AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });