const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { username, email, password, role, firstName, lastName, dateOfBirth } = req.body;

        // Validation
        if (!username || !email || !password || !firstName || !lastName || !dateOfBirth) {
            return res.status(400).json({
                success: false,
                message: "Username, email , password, first name, last name and date of birth are required.."
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Username or email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            role: role || "user",
            firstName,
            lastName,
            dateOfBirth
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during registration"
        });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validation
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required"
            });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exist"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password credentials"
            });
        }

        // Store user in session
        req.session.user = {
            id: user._id,
            username: user.username,
            role: user.role
        };

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: req.session.user
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during login"
        });
    }
});

// CHECK CURRENT SESSION
router.get("/me", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            success: false,
            message: "No active session"
        });
    }

    res.status(200).json({
        success: true,
        user: req.session.user
    });
});

// LOGOUT
router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Logout failed"
            });
        }

        res.clearCookie("connect.sid");
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    });
});

module.exports = router;