const Crop = require('../models/Crop');
const Farm = require('../models/Farm');

// POST /api/crops
exports.createCrop = async (req, res) => {
    try {
        const { name, plantDate, expectedHarvestDate, farmId } = req.body;

        const farm = await Farm.findOne({ _id: farmId, farmer: req.user.userId });
        if (!farm) return res.status(404).json({ message: "Farm not found or unauthorized" });

        const newCrop = new Crop({
            name,
            plantDate,
            expectedHarvestDate,
            farm: farmId
        });

        await newCrop.save();
        res.status(201).json({ message: "Crop added successfully!", crop: newCrop });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// GET /api/crops
exports.getCrops = async (req, res) => {
    try {
        const userFarms = await Farm.find({ farmer: req.user.userId }).select('_id');
        const farmIds = userFarms.map(farm => farm._id);

        const crops = await Crop.find({ farm: { $in: farmIds } });
        res.status(200).json(crops);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// GET /api/crops/:id
exports.getCropById = async (req, res) => {
    try {
        const crop = await Crop.findById(req.params.id);
        if (!crop) return res.status(404).json({ message: "Crop not found" });
        
        res.status(200).json(crop);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// PUT /api/crops/:id
exports.updateCrop = async (req, res) => {
    try {
        const updatedCrop = await Crop.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCrop) return res.status(404).json({ message: "Crop not found" });
        
        res.status(200).json({ message: "Crop updated!", crop: updatedCrop });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};