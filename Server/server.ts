import dotenv from 'dotenv';
import app from './src/app';
import express from 'express';
import jwt from "jsonwebtoken"
import { AppDataSource } from './src/config/data-source';


app.use(express.json())

const token = jwt.sign(
  { userId: 123 },
  'default_secret',
  { expiresIn: '1h' }
); // needs to implement security measures and hide data in the env file 

console.log(token);




AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });