import React, { useState } from 'react';
import UrlForm from '../Components/UrlForm';
import CustomUrlForm from '../Components/CustomUrlForm';

function Dashboard() {
    const [activeTab, setActiveTab] = useState('regular');

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-center mb-8">Create Short URLs</h1>
                    
                    {/* Tab Navigation */}
                    <div className="flex mb-6 border-b">
                        <button
                            onClick={() => setActiveTab('regular')}
                            className={`flex-1 py-2 px-4 text-center font-medium ${
                                activeTab === 'regular'
                                    ? 'border-b-2 border-blue-500 text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Regular URL
                        </button>
                        <button
                            onClick={() => setActiveTab('custom')}
                            className={`flex-1 py-2 px-4 text-center font-medium ${
                                activeTab === 'custom'
                                    ? 'border-b-2 border-purple-500 text-purple-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Custom URL
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[400px]">
                        {activeTab === 'regular' ? (
                            <div>
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                    Generate Random Short URL
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Create a short URL with randomly generated characters
                                </p>
                                <UrlForm />
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                    Create Custom Short URL
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Choose your own custom slug for a memorable URL
                                </p>
                                <CustomUrlForm />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;