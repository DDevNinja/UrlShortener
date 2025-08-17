import express from 'express';
import { login_user, register_user, get_current_user, logout_user } from '../controllers/auth.controller.js';
import { authmiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', login_user);
router.post('/register', register_user);
router.get('/me', authmiddleware, get_current_user);
router.post('/logout', logout_user);

export default router;
