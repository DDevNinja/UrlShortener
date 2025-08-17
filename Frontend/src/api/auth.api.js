import axios from 'axios';

const API_BASE_URL = 'https://urlshortener-xifk.onrender.com/api/auth';

// Configure axios to include cookies
axios.defaults.withCredentials = true;

export const loginUser = async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password
    });
    return response.data;
};

export const registerUser = async (name, email, password) => {
    const response = await axios.post(`${API_BASE_URL}/register`, {   
        name,
        email,
        password
    });
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await axios.get(`${API_BASE_URL}/me`);
    return response.data.user;
};

export const logoutUser = async () => {
    const response = await axios.post(`${API_BASE_URL}/logout`);
    return response.data;
};

