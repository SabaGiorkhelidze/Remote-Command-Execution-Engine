import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
console.log("JWT_SECRET:", JWT_SECRET);

export const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const authHeaders = request.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    response.status(400).json({ error: "Missing or altered token" });
    return;
  }

  const token = authHeaders.split(" ")[1];

  if (token !== JWT_SECRET) {
    response.status(401).json({ error: "Invalid or expired token" });
    return;
  }

  (request as any).user = {};
  next();
};
