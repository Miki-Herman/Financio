const express = require('express');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
require('dotenv').config();

router.use(express.json());

async function verifyUserAndGenerateToken(email, password) {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return { error: 'Username or password incorrect', status: 401 };
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return { error: 'Username or password incorrect', status: 401 };
        }

        const expirationDuration = 60 * 60;
        const expirationTimestamp = Math.floor(Date.now() / 1000) + expirationDuration;

        const token = jwt.sign(
            { id: user._id, role: user.role, email: user.email, exp: expirationTimestamp },
            process.env.JWT_SECRET
        );

        return { token: token, userId: user._id, expiresAt: expirationTimestamp, status: 200 };
    } catch (error) {
        console.error('Error in token generation:', error);
        return { error: 'Internal server error', status: 500 };
    }
}

router.post('/login', async (req, res) => {
    try {
        const result = await verifyUserAndGenerateToken(req.body.email, req.body.password);
        if (result.error) {
            return res.status(result.status).json({ message: result.error });
        }
        res.status(200).json({ message: 'Successfully authenticated', userToken: result.token, expiresAt: result.expiresAt });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        // Check if the email is already registered
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Check if the id is already in use
        const existingUserById = await User.findOne({ id: req.body.id });
        if (existingUserById) {
            return res.status(400).json({ message: 'ID already in use' });
        }


        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            email: req.body.email,
            password: hashedPassword,
            id: req.body.id,
            role: req.body.role
        });
        const savedUser = await user.save();

        res.status(201).json({ email: savedUser.email, _id: savedUser._id });
    } catch (error) {
        console.error('Error registering new user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
