import User from '../models/user.model.js';

export const getUserCount = async (req, res) => {
    try {
        const count = await User.countDocuments();
        res.status(200).json({ 
            success: true, 
            count 
        });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to fetch user count' 
        });
    }
};