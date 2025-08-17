import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { createshortUrl } from '../api/shortUrl.api';

function UrlForm() {
    const [url, seturl] = useState("http://www.google.com")
    const [shortUrl, setshortUrl] = useState("")
    const [copied, setCopied] = useState(false)

    const handlesubmit = async () => {
        try {
            const data = await createshortUrl(url);
            console.log('API Response:', data);
            
            // Extract the actual short URL from the response
            if (data && data.shortUrl) {
                setshortUrl(data.shortUrl);
            } else if (data && data.short_url) {
                setshortUrl(data.short_url);
            } else if (typeof data === 'string') {
                setshortUrl(data);
            } else {
                console.error('Unexpected response format:', data);
                setshortUrl('Error: Invalid response');
            }
            
            setCopied(false);
        } catch (error) {
            console.error('Error creating short URL:', error);
            setshortUrl('Error: Failed to create short URL');
        }
    };

    const handleCopy = () => {
        const fullUrl = `https://urlshortener-xifk.onrender.com/${shortUrl}`;
        navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

  return (
    <div className="space-y-4">
          <div>
            <label
              htmlFor="url"
              className="block text-gray-700 text-xm font-medium"
            >
              Enter your URL
            </label>
            <input
              type="url"
              id="url"
              required
              onInput={(event)=>{seturl(event.target.value)}}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
          onClick={handlesubmit} 
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Shorten URL
          </button>

           {shortUrl && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">
              Your shortened url
            </h2>
            <div className="flex items-center">
              <input
                type="text"
                readOnly
                value={shortUrl}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
  )
}

export default UrlForm
