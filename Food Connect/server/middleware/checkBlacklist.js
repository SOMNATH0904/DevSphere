const Blacklist = require('../models/Blacklist');

const checkBlacklist = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const isBlacklisted = await Blacklist.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ error: "Token is blacklisted. Please log in again." });
    }

    next();
};

module.exports = checkBlacklist;
