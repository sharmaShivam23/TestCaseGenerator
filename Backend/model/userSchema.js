const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: { type: Number, required: true, unique: true },
  username: String,
  avatar: String,
  githubAccessToken: String, // encrypted token
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
