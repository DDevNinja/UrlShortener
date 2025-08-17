import React, { useState } from 'react';
import axiosinstance from '../Utils/axiosInstance';

function CustomUrlForm() {
    const [url, setUrl] = useState("");
    const [slug, setSlug] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            
            const response = await axiosinstance.post("/api/create/custom", { 
                url, 
                slug 
            });
            
            setShortUrl(response.data.shortUrl);
            setCopied(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="url" className="block text-gray-700 text-sm font-medium">
                        Enter your URL
                    </label>
                    <input
                        type="url"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com"
                    />
                </div>

                <div>
                    <label htmlFor="slug" className="block text-gray-700 text-sm font-medium">
                        Custom URL (optional)
                    </label>
                    <div className="flex items-center">
                        <span className="text-gray-500 text-sm mr-2">localhost:3000/</span>
                        <input
                            type="text"
                            id="slug"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="my-custom-url"
                            pattern="[a-zA-Z0-9_-]+"
                            title="Only letters, numbers, hyphens, and underscores allowed"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Only letters, numbers, hyphens, and underscores allowed
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    {loading ? 'Creating...' : 'Create Custom URL'}
                </button>
            </form>

            {error && (
                <div className="text-red-500 text-sm mt-3 p-3 bg-red-50 rounded-md">
                    {error}
                </div>
            )}

            {shortUrl && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Your custom short URL</h2>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            readOnly
                            value={shortUrl}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleCopy}
                            className={`font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 ${
                                copied 
                                    ? 'bg-green-500 hover:bg-green-600 focus:ring-green-500' 
                                    : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500'
                            } text-white`}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomUrlForm;