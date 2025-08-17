import urlSchema from "../models/short_url.model.js";

export const saveShortUrl = async (shortUrl, longUrl, userId = null) => {
  const urlData = {
    full_url: longUrl,
    short_url: shortUrl,
    clicks: 0,
  };
  
  // Only add user field if userId is provided
  if (userId) {
    urlData.user = userId;
  }
  
  const newUrl = new urlSchema(urlData);
  await newUrl.save();
  console.log("Saved URL with user:", userId);
};

export const getShortUrl = async (shortUrl) => {
  return await urlSchema.findOneAndUpdate(
    { short_url: shortUrl },
    { $inc: { clicks: 1 } },
    { new: true }
  );
};

export const getCustomShortUrl = async (slug) => {
  return await urlSchema.findOne({ short_url: slug });
};
