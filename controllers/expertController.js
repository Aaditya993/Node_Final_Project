const Advice = require('../models/Advice');

// POST /api/experts/advice (Only Experts can do this)
exports.giveAdvice = async (req, res) => {
    try {
        const { farmId, message, type } = req.body;

        const newAdvice = new Advice({
            expert: req.user.userId, // Pulls the Expert's ID from their token
            farm: farmId,
            message,
            type
        });

        await newAdvice.save();
        res.status(201).json({ message: "Advice sent to farmer successfully!", advice: newAdvice });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// GET /api/experts/advice/:farmId (Farmers can read this)
exports.getFarmAdvice = async (req, res) => {
    try {
        const advice = await Advice.find({ farm: req.params.farmId }).populate('expert', 'name');
        res.status(200).json(advice);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};