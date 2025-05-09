import dotenv from 'dotenv';
import app from './src/app';

import jwt from "jsonwebtoken"

const token = jwt.sign(
  { userId: 123 }, // your payload
  'default_secret', // your secret
  { expiresIn: '1h' } // token expires in 1 hour
);

console.log(token);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});