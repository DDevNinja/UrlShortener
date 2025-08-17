import { findUserById } from "../../dov/user.dao.js";
import { verifyToken } from "../../Utils/helper.js";

export const authmiddleware = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token provided" });
  }
  
  try {
    const userId = verifyToken(token);
    const user = await findUserById(userId);
    
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};
