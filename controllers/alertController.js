const Alert = require('../models/Alert');
const Farm = require('../models/Farm');

// GET /api/alerts
exports.getAlerts = async (req, res) => {
    try {
        const userFarms = await Farm.find({ farmer: req.user.userId }).select('_id');
        const farmIds = userFarms.map(farm => farm._id);

        const alerts = await Alert.find({ farm: { $in: farmIds } }).sort({ createdAt: -1 });
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// POST /api/alerts/check
exports.checkAlerts = async (req, res) => {
    try {
        const { farmId } = req.body;
        
        // Simulating the system checking sensors and generating a warning
        const newAlert = new Alert({
            farm: farmId,
            message: "Low moisture alert detected in field",
            type: "moisture"
        });

        await newAlert.save();
        res.status(201).json({ message: "Alert check complete. New alerts generated.", alert: newAlert });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};