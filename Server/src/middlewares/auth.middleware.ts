import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const authMiddleware = (request: Request, response: Response, next: NextFunction): void => {
    const authHeaders = request.headers.authorization;

    if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
        response.status(400).json({ error: "Missing or altered token" });
        return;
    }

    const token = authHeaders.split(" ")[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (request as any).user = decoded // needs type safety and further planning what will be in the request body. marked for future commit
        next()
     } catch (error) {
        response.status(401).json({ error: 'Invalid or expired token' });
    }

}