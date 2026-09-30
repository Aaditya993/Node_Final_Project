const Farm = require('../models/Farm');

// POST /api/farms
exports.createFarm = async (req, res) => {
    try {
        const { name, sizeInAcres, sensorIds } = req.body;

        // Create the farm, pulling the farmer's ID directly from the JWT token middleware
        const newFarm = new Farm({
            name,
            sizeInAcres,
            sensorIds,
            farmer: req.user.userId 
        });

        await newFarm.save();
        res.status(201).json({ message: "Farm created successfully!", farm: newFarm });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// GET /api/farms (Get all farms belonging to the logged-in farmer)
exports.getFarms = async (req, res) => {
    try {
        // Find only the farms where the farmer ID matches the logged-in user's token
        const farms = await Farm.find({ farmer: req.user.userId });
        res.status(200).json(farms);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// GET /api/farms/:id (Get one specific farm)
exports.getFarmById = async (req, res) => {
    try {
        const farm = await Farm.findOne({ _id: req.params.id, farmer: req.user.userId });
        if (!farm) return res.status(404).json({ message: "Farm not found" });
        
        res.status(200).json(farm);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// PUT /api/farms/:id (Update a farm's details)
exports.updateFarm = async (req, res) => {
    try {
        const updatedFarm = await Farm.findOneAndUpdate(
            { _id: req.params.id, farmer: req.user.userId },
            req.body,
            { new: true } // This tells Mongoose to return the updated data, not the old data
        );
        if (!updatedFarm) return res.status(404).json({ message: "Farm not found" });
        
        res.status(200).json({ message: "Farm updated!", farm: updatedFarm });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// DELETE /api/farms/:id (Delete a farm)
exports.deleteFarm = async (req, res) => {
    try {
        const deletedFarm = await Farm.findOneAndDelete({ _id: req.params.id, farmer: req.user.userId });
        if (!deletedFarm) return res.status(404).json({ message: "Farm not found" });
        
        res.status(200).json({ message: "Farm deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};