import axios from 'axios';

const axiosinstance = axios.create({
    baseURL: 'https://urlshortener-xifk.onrender.com',
    withCredentials: true,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add response interceptor to handle errors
axiosinstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default axiosinstance;


