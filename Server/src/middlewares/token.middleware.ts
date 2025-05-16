import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret: string | undefined = process.env.JWT_SECRET;
console.log(jwtSecret);



export const generateToken = (userId: number, username: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Secret not defined");

  return jwt.sign(
    { userId, username },
    secret,
    {
      expiresIn: '1h',
      algorithm: 'HS256',
    }
  );
};


