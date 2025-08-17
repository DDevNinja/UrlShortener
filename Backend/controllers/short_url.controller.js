import {
  createShortUrlWithoutusingService,
  createShortUrlWithuseService,
  getUserUrlsService,
  deleteUserUrlService,
  getShortUrlService
} from "../services/short_url.service.js";

export const createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    let shortUrl;
    if (req.user) {
      console.log("Creating URL for user:", req.user._id);
      shortUrl = await createShortUrlWithuseService(url, req.user._id);
    } else {
      console.log("Creating URL without user");
      shortUrl = await createShortUrlWithoutusingService(url);
    }

    const fullShortUrl = `${process.env.APP_URL}${shortUrl}`;
    console.log("Generated short URL:", fullShortUrl);
    res.status(200).json({ shortUrl: fullShortUrl });
  } catch (err) {
    console.error("Error creating short URL:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

export const createCustomShortUrl = async (req, res) => {
  try {
    const { url, slug } = req.body;
    if (!url || !slug) {
      return res.status(400).json({ error: "URL and custom slug are required" });
    }

    const userId = req.user ? req.user._id : null;
    const shortUrl = await createShortUrlWithuseService(url, userId, slug);
    
    const fullShortUrl = `${process.env.APP_URL}${shortUrl}`;
    res.status(200).json({ shortUrl: fullShortUrl });
  } catch (err) {
    console.error("Error creating custom short URL:", err);
    if (err.message === "This Custom URL Already exists") {
      return res.status(409).json({ error: err.message });
    }
    res.status(500).json({ error: "Server Error" });
  }
};

export const getUserUrls = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const urls = await getUserUrlsService(req.user._id);
    res.status(200).json(urls);
  } catch (err) {
    console.error("Error fetching user URLs:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

export const deleteUserUrl = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const { urlId } = req.params;
    await deleteUserUrlService(urlId, req.user._id);
    res.status(200).json({ message: "URL deleted successfully" });
  } catch (err) {
    console.error("Error deleting URL:", err);
    if (err.message === "URL not found or unauthorized") {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: "Server Error" });
  }
};

export const redirectFromShortUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const urlData = await getShortUrlService(id);
    
    if (!urlData) {
      return res.status(404).send("URL not found");
    }
    
    res.redirect(urlData.full_url);
  } catch (err) {
    console.error("Error redirecting:", err);
    res.status(500).send("Server Error");
  }
};
