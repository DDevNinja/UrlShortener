import dotenv from "dotenv";
import ConnectDB from "./src/config/mongo.config.js";
import { createUser, findUserByEmail } from "./dov/user.dao.js";
import { saveShortUrl } from "./dov/short_url.js";
import urlSchema from "./models/short_url.model.js";

dotenv.config({ path: "./.env" });

async function testUserSave() {
    try {
        // Connect to database
        await ConnectDB();
        console.log("Connected to database");

        // Test 1: Create a user
        const testEmail = "test@example.com";
        
        // Check if user already exists
        let existingUser = await findUserByEmail(testEmail);
        if (existingUser) {
            console.log("User already exists:", existingUser._id);
        } else {
            // Create new user
            const newUser = await createUser("Test User", testEmail, "password123");
            console.log("Created new user:", newUser._id);
            existingUser = newUser;
        }

        // Test 2: Create a URL with user
        const testUrl = "https://www.example.com/very-long-url-for-testing";
        const shortCode = "test123";
        
        await saveShortUrl(shortCode, testUrl, existingUser._id);
        console.log("Saved URL with user ID");

        // Test 3: Verify the URL was saved with user
        const savedUrl = await urlSchema.findOne({ short_url: shortCode });
        console.log("Retrieved URL:", {
            shortUrl: savedUrl.short_url,
            fullUrl: savedUrl.full_url,
            userId: savedUrl.user,
            clicks: savedUrl.clicks
        });

        if (savedUrl.user) {
            console.log("✅ SUCCESS: User ID was saved with the URL!");
        } else {
            console.log("❌ FAILED: User ID was not saved with the URL");
        }

        // Test 4: Create a URL without user
        const shortCode2 = "test456";
        await saveShortUrl(shortCode2, testUrl, null);
        
        const savedUrl2 = await urlSchema.findOne({ short_url: shortCode2 });
        console.log("URL without user:", {
            shortUrl: savedUrl2.short_url,
            userId: savedUrl2.user
        });

        if (savedUrl2.user === null) {
            console.log("✅ SUCCESS: URL without user saved correctly!");
        } else {
            console.log("❌ FAILED: URL without user has unexpected user value");
        }

        process.exit(0);
    } catch (error) {
        console.error("Test failed:", error);
        process.exit(1);
    }
}

testUserSave();
