import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import shortUrlRoutes from './routes/short_url.route.js';
import { attachUser } from './Utils/attachUser.js';
import { redirectFromShortUrl } from './controllers/short_url.controller.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Add this middleware before your routes in development
if (process.env.NODE_ENV === 'development') {
    app.use('/api/dev/clear-auth', (req, res) => {
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/'
        });
        res.json({ message: 'Auth cookie cleared' });
    });
}

// MongoDB Connection
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/url-shortener";
        await mongoose.connect(mongoURI);
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        process.exit(1);
    }
};

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(attachUser);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', shortUrlRoutes);

// Redirect route for short URLs
app.get('/:id', redirectFromShortUrl);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
};

startServer();


