import React, { useState, useEffect } from 'react';
import { getUserUrls, deleteUrl } from '../api/shortUrl.api';
import { useAuth } from '../context/AuthContext';

function Profile() {
    const { user } = useAuth();
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUserUrls();
    }, []);useEffect(() => {
  const fetchUrls = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found. Redirecting to login...");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("https://urlshortener-xifk.onrender.com/api/user/urls", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setUrls(data.urls);
    } catch (error) {
      console.error("Failed to fetch URLs", error);
    }
  };

  fetchUrls();
}, []);


    const fetchUserUrls = async () => {
        try {
            setLoading(true);
            const data = await getUserUrls();
            setUrls(data);
        } catch (err) {
            setError('Failed to fetch URLs');
            console.error('Error fetching URLs:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (urlId) => {
        if (!window.confirm('Are you sure you want to delete this URL?')) return;
        
        try {
            await deleteUrl(urlId);
            setUrls(urls.filter(url => url._id !== urlId));
        } catch (err) {
            setError('Failed to delete URL');
            console.error('Error deleting URL:', err);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(`https://urlshortener-xifk.onrender.com/${text}`);
    };

    if (loading) return <div className="flex justify-center p-8">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h1 className="text-2xl font-bold mb-4">My Profile</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-600">Name</h3>
                        <p className="text-gray-700">{user?.name}</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-600">Email</h3>
                        <p className="text-gray-700">{user?.email}</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-purple-600">Total URLs</h3>
                        <p className="text-2xl font-bold text-gray-700">{urls.length}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">My URLs</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                
                {urls.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No URLs created yet</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-4 py-2 text-left">Original URL</th>
                                    <th className="px-4 py-2 text-left">Short URL</th>
                                    <th className="px-4 py-2 text-left">Clicks</th>
                                    <th className="px-4 py-2 text-left">Created</th>
                                    <th className="px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {urls.map((url) => (
                                    <tr key={url._id} className="border-b">
                                        <td className="px-4 py-2">
                                            <a 
                                                href={url.fullUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline truncate block max-w-xs"
                                            >
                                                {url.fullUrl}
                                            </a>
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-green-600 font-mono">
                                                    {url.shortUrl}
                                                </span>
                                                <button
                                                    onClick={() => copyToClipboard(url.shortUrl)}
                                                    className="text-blue-500 hover:text-blue-700"
                                                    title="Copy to clipboard"
                                                >
                                                    📋
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                                                {url.clicks}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-500">
                                            {new Date(url.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleDelete(url._id)}
                                                className="text-red-500 hover:text-red-700"
                                                title="Delete URL"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
