import mongoose from "mongoose";
import User from "../models/user.model.js";
import { jwt_secret, jwt_expires_in } from "../config/env.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Use environment variables or provide default values for JWT secret and expiration time
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export const signup = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction(); // Start transaction

    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        if (await User.findOne({ email })) {
            throw Object.assign(new Error("User already exists"), { statusCode: 409 });
        }
        // check the user name should be unique
        if (await User.findOne({ name })) {
            throw Object.assign(new Error("User name is already taken"), { statusCode: 409 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user inside a transaction
        const [newUser] = await User.create([{ name, email, password: hashedPassword }], { session });

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        // Commit transaction and return response
        await session.commitTransaction();
        res.status(201).json({ success: true, message: "User created successfully", data: { token, user: newUser } });
    } catch (error) {
        await session.abortTransaction(); // Abort transaction on error
        next(error);
    } finally {
        session.endSession(); // End session
    }
};

// Placeholder for sign-in functionality
export const signIn = async (req, res,next) => {
    try{
        const {name,email,password} = req.body;
        const user = await User.findOne({name,email})
        if(!user){
            const error = new Error("user is not found");
            error.statusCode = 400
            throw error;
        }
        const passchecker = await bcrypt.compare(password,user.password);
        if(!passchecker){
            const error = new Error("password is not correct");
            error.statusCode = 404;
            throw error;
        } 
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        // user.password = undefined;
        res.status(201).json({ success: true, message: "User signed in successfully", data: { token, user } });
        

    }catch(error){
        next(error);

    }

    // res.json({ message: "SignIn route not implemented yet" });
};

// Placeholder for sign-out functionality
export const signOut = async (req, res) => {
    res.json({ message: "SignOut route not implemented yet" });
};
