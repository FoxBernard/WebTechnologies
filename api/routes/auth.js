const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

// REGISTER (for testing)
router.post("/register", async (req, res) => {
    const { username, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        email,
        password: hashedPassword,
        role
    });

    await user.save();

    res.json({ message: "User registered" });
});


// LOGIN
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ message: "User does not" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid password credentials" });
    }

    // Store user in session 
    req.session.user = {
        id: user._id,
        username: user.username,
        role: user.role
    };

    res.json({ message: "Logged in" });
});

// LOGOUT
router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.json({ message: "Logged out" });
    });
});

module.exports = router;