import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';

export const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '10m' }
    );
};

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
        return decoded.userId;
    } catch (error) {
        throw new Error('Invalid token');
    }
};

export const generateNanoId = (length = 7) => {
    return nanoid(length);
};
