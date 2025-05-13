import dotenv from 'dotenv';
import app from './src/app';
import express from 'express';
import jwt from "jsonwebtoken"

app.use(express.json())

const token = jwt.sign(
  { userId: 123 },
  'default_secret',
  { expiresIn: '1h' }
);

console.log(token);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});