import axios from 'axios';

const API_BASE_URL = 'https://urlshortener-xifk.onrender.com/api/stats';

export const getUserCount = async () => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data.count;
};
