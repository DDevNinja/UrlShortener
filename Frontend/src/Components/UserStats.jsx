import React, { useState, useEffect } from 'react';
import { getUserCount } from '../api/stats.api';

function UserStats() {
    const [userCount, setUserCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserCount();
    }, []);

    const fetchUserCount = async () => {
        try {
            const count = await getUserCount();
            setUserCount(count);
        } catch (error) {
            console.error('Failed to fetch user count:', error);
            setUserCount(0);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                        Join Our Community
                    </h3>
                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-2xl font-bold text-blue-600">
                            {loading ? '...' : userCount.toLocaleString()}
                        </span>
                        <span className="text-gray-600">
                            {userCount === 1 ? 'user has' : 'users have'} already joined!
                        </span>
                    </div>
                </div>
                <p className="text-sm text-gray-500">
                    ✨ Create custom URLs<br/>
                    📊 Track click analytics<br/>
                    🔒 Secure and reliable
                </p>
            </div>
        </div>
    );
}

export default UserStats;