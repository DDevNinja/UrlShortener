import urlSchema from "../models/short_url.model.js";
import { generateNanoId } from "../Utils/helper.js";

export const createShortUrlWithoutusingService = async (url) => {
    const shortUrl = generateNanoId(7);
    if (!shortUrl) throw new Error("Short URL not generated");
    
    const urlData = new urlSchema({
        full_url: url,
        short_url: shortUrl,
        clicks: 0
    });
    
    await urlData.save();
    console.log('✅ Anonymous URL saved to database');
    return shortUrl;
};

export const createShortUrlWithuseService = async (url, userId, customSlug = null) => {
    const shortUrl = customSlug || generateNanoId(7);
    
    // Check if custom URL already exists FOR THIS USER
    if (customSlug && userId) {
        const existingUrl = await urlSchema.findOne({ 
            short_url: customSlug, 
            user: userId 
        });
        if (existingUrl) {
            throw new Error("You already have a custom URL with this name");
        }
    }
    
    // For anonymous users, still check globally
    if (customSlug && !userId) {
        const existingUrl = await urlSchema.findOne({ short_url: customSlug });
        if (existingUrl) {
            throw new Error("This Custom URL Already exists");
        }
    }
    
    const urlData = new urlSchema({
        full_url: url,
        short_url: shortUrl,
        clicks: 0,
        user: userId
    });
    
    await urlData.save();
    console.log('✅ User URL saved to database for user:', userId);
    return shortUrl;
};

export const getUserUrlsService = async (userId) => {
    try {
        const urls = await urlSchema.find({ user: userId })
            .sort({ createdAt: -1 })
            .select('full_url short_url clicks createdAt');
        
        return urls.map(url => ({
            _id: url._id,
            fullUrl: url.full_url,
            shortUrl: url.short_url,
            clicks: url.clicks,
            createdAt: url.createdAt
        }));
    } catch (error) {
        console.error('Error fetching user URLs:', error);
        throw error;
    }
};

export const deleteUserUrlService = async (urlId, userId) => {
    try {
        const result = await urlSchema.findOneAndDelete({ 
            _id: urlId, 
            user: userId 
        });
        
        if (!result) {
            throw new Error("URL not found or unauthorized");
        }
        
        return result;
    } catch (error) {
        console.error('Error deleting URL:', error);
        throw error;
    }
};

export const getShortUrlService = async (shortUrl) => {
    try {
        return await urlSchema.findOneAndUpdate(
            { short_url: shortUrl },
            { $inc: { clicks: 1 } },
            { new: true }
        );
    } catch (error) {
        console.error('Error getting short URL:', error);
        throw error;
    }
};
