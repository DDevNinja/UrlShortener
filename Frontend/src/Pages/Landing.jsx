import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        URL Shortener
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Create short, memorable links for your URLs
                    </p>
                    
                    <div className="space-y-4">
                        <Link
                            to="/login"
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200 block text-center font-medium"
                        >
                            Sign In
                        </Link>
                        
                        <Link
                            to="/register"
                            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 transition duration-200 block text-center font-medium border"
                        >
                            Sign Up
                        </Link>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                            ✨ Create custom URLs<br/>
                            📊 Track click analytics<br/>
                            🔒 Secure and reliable
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;