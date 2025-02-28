const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true }
});

module.exports = mongoose.model('Blacklist', blacklistSchema);
