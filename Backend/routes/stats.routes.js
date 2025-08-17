import express from 'express';
import { getUserCount } from '../controllers/stats.controller.js';

const router = express.Router();

router.get('/users', getUserCount);

export default router;