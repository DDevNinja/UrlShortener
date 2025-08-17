import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../Utils/helper.js";
import mongoose from "mongoose";

export const registerUser = async (name, email, password) => {
    try {
        console.log('🔄 Starting user registration process...');
        console.log('📊 MongoDB connection state:', mongoose.connection.readyState);
        console.log('📝 Registration data:', { name, email, passwordLength: password?.length });
        
        // Check MongoDB connection
        if (mongoose.connection.readyState !== 1) {
            throw new Error('Database not connected');
        }
        
        // Validate input
        if (!name || !email || !password) {
            throw new Error('Name, email, and password are required');
        }
        
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }
        
        console.log('🔍 Checking if user exists...');
        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            console.log('❌ User already exists:', email);
            throw new Error("User already exists with this email");
        }
        console.log('✅ Email is available');

        console.log('🔐 Hashing password...');
        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log('✅ Password hashed successfully');

        console.log('👤 Creating user document...');
        // Create user
        const userData = {
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword
        };
        
        const user = new User(userData);
        console.log('📄 User document created:', { name: user.name, email: user.email });

        console.log('💾 Saving user to database...');
        const savedUser = await user.save();
        console.log('✅ User saved successfully!');
        console.log('📊 Saved user details:', {
            id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            createdAt: savedUser.createdAt
        });

        // Generate JWT token
        console.log('🎫 Generating JWT token...');
        const token = generateToken(savedUser._id);
        console.log('✅ JWT token generated');

        return { token, user: savedUser };
        
    } catch (error) {
        console.error('❌ Registration service error:', error);
        
        // Log specific error details
        if (error.name === 'ValidationError') {
            console.error('📋 Validation errors:', Object.keys(error.errors));
            const messages = Object.values(error.errors).map(err => err.message);
            throw new Error(`Validation failed: ${messages.join(', ')}`);
        }
        
        if (error.name === 'MongoServerError' && error.code === 11000) {
            console.error('🔄 Duplicate key error:', error.keyPattern);
            throw new Error('Email already exists');
        }
        
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        console.log('🔐 Starting login process for:', email);
        console.log('📊 MongoDB connection state:', mongoose.connection.readyState);
        
        // Check MongoDB connection
        if (mongoose.connection.readyState !== 1) {
            throw new Error('Database not connected');
        }
        
        console.log('🔍 Finding user by email...');
        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            console.log('❌ User not found:', email);
            throw new Error("Invalid email or password");
        }
        console.log('✅ User found:', user.email);

        console.log('🔐 Verifying password...');
        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('❌ Invalid password for:', email);
            throw new Error("Invalid email or password");
        }
        console.log('✅ Password verified');

        console.log('🎫 Generating token...');
        // Generate JWT token
        const token = generateToken(user._id);
        console.log('✅ Login successful for:', user.email);

        return { token, user };
    } catch (error) {
        console.error('❌ Login service error:', error);
        throw error;
    }
};
