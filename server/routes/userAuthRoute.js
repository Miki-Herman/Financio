const express = require('express');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { OAuth2Client } = require('google-auth-library');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
require('dotenv').config();

async function verifyGoogleToken(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload();
}

router.post('/google-login', async (req, res) => {
    try {
        const payload = await verifyGoogleToken(req.body.token);
        let user = await User.findOne({ email: payload.email });

        if (!user) {
            user = new User({
                email: payload.email,
                googleId: payload.sub,  // Google's unique ID for the user
                isGoogleUser: true      // Flag indicating this is a Google user
            });
            await user.save();
        }

        // Generate a token for the user
        const expirationDuration = 60 * 60; // 1 hour
        const expirationTimestamp = Math.floor(Date.now() / 1000) + expirationDuration;

        const token = jwt.sign(
            { id: user._id, role: user.role, email: user.email, exp: expirationTimestamp },
            process.env.JWT_SECRET
        );

        res.status(200).json({
            message: 'Successfully authenticated',
            userToken: token,
            expiresAt: expirationTimestamp
        });
    } catch (error) {
        console.error('Error verifying Google token:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

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

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            email: req.body.email,
            password: hashedPassword
        });
        const savedUser = await user.save();

        res.status(201).json({ email: savedUser.email, id: savedUser._id });
    } catch (error) {
        console.error('Error registering new user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
