import mongoose from 'mongoose';
import { registerUser } from './services/auth.service.js';
import dotenv from 'dotenv';

dotenv.config();

const testRegistration = async () => {
    try {
        console.log('🔄 Starting registration test...');
        
        // Connect to MongoDB
        const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/url-shortener";
        await mongoose.connect(mongoURI);
        console.log('✅ Connected to MongoDB');
        
        // Test registration
        const testData = {
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'testpassword123'
        };
        
        console.log('🧪 Testing registration with:', testData);
        const result = await registerUser(testData.name, testData.email, testData.password);
        console.log('✅ Registration successful!', {
            userId: result.user._id,
            email: result.user.email,
            hasToken: !!result.token
        });
        
        // Clean up - delete test user
        await mongoose.model('User').deleteOne({ email: testData.email });
        console.log('🧹 Test user cleaned up');
        
        await mongoose.disconnect();
        console.log('👋 Test completed successfully');
        
    } catch (error) {
        console.error('❌ Registration test failed:', error);
        await mongoose.disconnect();
    }
};

testRegistration();