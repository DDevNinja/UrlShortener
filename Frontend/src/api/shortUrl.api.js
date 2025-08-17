import axiosinstance from '../Utils/axiosInstance';

export const createshortUrl = async (fullUrl) => {
    try {
        console.log('Creating short URL for:', fullUrl);
        const response = await axiosinstance.post('/api/create', {
            url: fullUrl  // Changed from 'full_url' to 'url'
        });
        
        console.log('Short URL API response:', response.data);
        
        // Return the response data
        return response.data;
    } catch (error) {
        console.error('Error in createshortUrl:', error);
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
        throw error;
    }
};

export const getUserUrls = async () => {
    try {
        const response = await axiosinstance.get('/api/user/urls');
        return response.data.urls || response.data;
    } catch (error) {
        console.error('Error fetching user URLs:', error);
        throw error;
    }
};

export const deleteUrl = async (urlId) => {
    try {
        const response = await axiosinstance.delete(`/api/user/urls/${urlId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting URL:', error);
        throw error;
    }
};
