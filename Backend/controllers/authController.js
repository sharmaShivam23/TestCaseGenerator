const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');
const { encrypt } = require('../utils/crypto');
require('dotenv').config();

const router = express.Router();

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const APP_NAME = process.env.APP_NAME || 'MyApp';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.warn('GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET not set in .env');
}

// GET /api/auth/github -> redirect user to GitHub
router.get('/github', (req, res) => {
  const redirectUri = "https://testcasegenerator.onrender.com/api/auth/github";
  // const redirectUri = "http://localhost:5000/api/auth/github/callback";
  // const redirectUri = "http://localhost:5000/api/github/callback";
  // http://localhost:5000/api/auth/github
  const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=repo%20read:user`;
  res.redirect(url);
});

// GET /api/auth/github/callback?code=...
router.get('/github/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send('Missing code');

  try {
    // exchange code for access token
    const tokenRes = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      { headers: { Accept: 'application/json', 'User-Agent': APP_NAME } }
    );

    if (tokenRes.data.error) {
      console.error('GH token error', tokenRes.data);
      return res.status(400).json({ message: 'GitHub token error', error: tokenRes.data });
    }

    const access_token = tokenRes.data.access_token;
    if (!access_token) return res.status(500).json({ message: 'No access token returned by GitHub' });

    // get user profile
    const userRes = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${access_token}`, Accept: 'application/vnd.github+json', 'User-Agent': APP_NAME },
    });
    const { id: githubId, login, avatar_url } = userRes.data;
    if (!githubId) return res.status(500).json({ message: 'GitHub user id missing' });

    // find or create user
    let user = await User.findOne({ githubId });
    const encrypted = encrypt(access_token);
    if (!user) {
      user = await User.create({ githubId, username: login, avatar: avatar_url, githubAccessToken: encrypted });
    } else {
      user.githubAccessToken = encrypted;
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Redirect to frontend with our JWT (NOT the GitHub token). Frontend stores our JWT.
    const redirect = `${FRONTEND_URL}?token=${token}`;
    res.redirect(redirect);
  } catch (err) {
    console.error('GitHub OAuth callback error:', err.response?.data || err.message);
    res.status(500).json({ message: 'GitHub OAuth failed' });
  }
});

module.exports = router;
