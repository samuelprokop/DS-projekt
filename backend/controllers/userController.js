import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";
import {
    toast
} from 'react-toastify';

const createToken = (id) => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
}

const loginUser = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        const user = await userModel.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = createToken(user.id);
        return res.json({
            success: true,
            token,
            userId: user.id,
            message: "Login successful"
        });

    } catch (error) {
        toast.error('Login error: ' + error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters"
            });
        }

        const exists = await userModel.findOne({
            where: {
                email
            }
        });
        if (exists) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        });

        const token = createToken(newUser.id);
        return res.status(201).json({
            success: true,
            token,
            userId: newUser.id,
            message: "Registration successful"
        });

    } catch (error) {
        toast.error('Registration error: ' + error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const adminLogin = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({
                success: false,
                message: "Invalid admin credentials"
            });
        }

        const token = jwt.sign({
                email: email,
                isAdmin: true
            },
            process.env.JWT_SECRET, {
                expiresIn: '24h'
            }
        );

        res.json({
            success: true,
            token: token,
            isAdmin: true,
            message: "Admin login successful"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export {
    loginUser,
    registerUser,
    adminLogin
};
