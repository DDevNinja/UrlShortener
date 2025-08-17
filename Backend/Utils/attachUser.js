import { findUserById } from "../dov/user.dao.js";
import { verifyToken } from "./helper.js";

export const attachUser = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return next();
    
    try {
        const userId = verifyToken(token);
        const user = await findUserById(userId);
        console.log("Found user:", user);
        
        if (!user) return next();
        req.user = user;
        next();
    } catch (error) {
        console.log("Token verification failed:", error.message);
        next();
    }
};
