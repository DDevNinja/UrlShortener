import express from "express";
import { 
    createShortUrl, 
    createCustomShortUrl, 
    getUserUrls, 
    deleteUserUrl 
} from "../controllers/short_url.controller.js";
import { authmiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// URL creation routes (work with or without authentication)
router.post("/create", createShortUrl);
router.post("/create/custom", createCustomShortUrl);

// Protected routes for user URL management
router.get("/user/urls", authmiddleware, getUserUrls);
router.delete("/user/urls/:urlId", authmiddleware, deleteUserUrl);

export default router;
