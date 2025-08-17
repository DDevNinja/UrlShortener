import mongoose from 'mongoose';

const testConnection = async () => {
    try {
        console.log('🔄 Testing MongoDB connection...');
        
        const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/url-shortener";
        console.log('📍 Connecting to:', mongoURI);
        
        await mongoose.connect(mongoURI);
        console.log('✅ MongoDB Connected Successfully');
        
        // Test database operations
        const testCollection = mongoose.connection.db.collection('test');
        const result = await testCollection.insertOne({ test: 'data', timestamp: new Date() });
        console.log('✅ Test document inserted:', result.insertedId);
        
        // Clean up
        await testCollection.deleteOne({ _id: result.insertedId });
        console.log('🧹 Test document deleted');
        
        await mongoose.disconnect();
        console.log('👋 Disconnected successfully');
        
    } catch (error) {
        console.error('❌ Connection test failed:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            code: error.code
        });
    }
};

testConnection();