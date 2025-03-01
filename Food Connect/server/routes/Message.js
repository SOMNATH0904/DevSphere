const express = require('express');
const router = express.Router();
const MessageModel = require('../models/message');
const UserModel = require('../models/User'); 
router.post('/send', async (req, res) => {
    try {
        const { senderId, receiverId, messageText } = req.body;
        const sender = await UserModel.findById(senderId);
        const receiver = await UserModel.findById(receiverId);

        if (!sender || !receiver) {
            return res.status(404).json({ error: "Invalid sender or receiver ID" });
        }
        const message = new MessageModel({
            sender: senderId,
            receiver: receiverId,
            message: messageText
        });

        await message.save();
        res.status(201).json({ message: "Message sent successfully", data: message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const messages = await MessageModel.find({ receiver: userId })
            .populate('sender', 'Name Email') 
            .sort({ timestamp: -1 }); 

        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/sent/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const messages = await MessageModel.find({ sender: userId })
            .populate('receiver', 'Name Email')
            .sort({ timestamp: -1 });

        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
