import { loginUser, registerUser } from "../services/auth.service.js";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 10 * 60 * 1000, // 10 minutes - matches JWT expiration
    path: '/'
};

export const login_user = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Email and password are required" 
            });
        }

        const { token, user } = await loginUser(email, password);
        
        res.cookie("accessToken", token, cookieOptions);
        res.status(200).json({ 
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
};

export const register_user = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Name, email and password are required" 
            });
        }

        const { token, user } = await registerUser(name, email, password);
        
        res.cookie("accessToken", token, cookieOptions);
        res.status(201).json({ 
            success: true,
            message: "Registration successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
};

export const get_current_user = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated"
            });
        }

        res.status(200).json({
            success: true,
            user: {
                _id: req.user._id,
                name: req.user.name,
                email: req.user.email
            }
        });
    } catch (error) {
        console.error("Get current user error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const logout_user = async (req, res) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        });
        res.status(200).json({ 
            success: true,
            message: "Logout successful" 
        });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
};
