import User from "../models/user.model.js";

export const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId).select('-password');
        return user;
    } catch (error) {
        console.error('Error finding user by ID:', error);
        return null;
    }
};

export const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        console.error('Error finding user by email:', error);
        return null;
    }
};

export const createUser = async (userData) => {
    try {
        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// export const updateUser = async (id, name, email, password) => {
//     const user = await User.findById(id);
//     if (!user) throw new Error("User not found");
//     user.name = name;
//     user.email = email;
//     user.password = password;
//     await user.save();
//     return user;
// }

// export const deleteUser = async (id) => {
//     const user = await User.findById(id);
//     if (!user) throw new Error("User not found");
//     await user.remove();
//     return user;
// }
