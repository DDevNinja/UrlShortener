import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import shortUrlRoutes from './routes/short_url.route.js';
import { attachUser } from './Utils/attachUser.js';
import { redirectFromShortUrl } from './controllers/short_url.controller.js';

const app = express();

// CORS configuration
const corsOptions = {
    origin: 'https://urlshortener-1-frontend.onrender.com',
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Attach user middleware (optional authentication)
app.use(attachUser);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', shortUrlRoutes);

// Redirect route (should be at root level)
app.get('/:id', redirectFromShortUrl);

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

export default app;
