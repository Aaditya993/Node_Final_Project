const Irrigation = require('../models/Irrigation');
const Farm = require('../models/Farm');

// POST /api/irrigation/start
exports.startIrrigation = async (req, res) => {
    try {
        const { farmId, durationInHours } = req.body;

        const farm = await Farm.findOne({ _id: farmId, farmer: req.user.userId });
        if (!farm) return res.status(404).json({ message: "Farm not found or unauthorized" });

        const newIrrigation = new Irrigation({
            farm: farmId,
            status: 'active',
            durationInHours
        });

        await newIrrigation.save();
        res.status(201).json({ message: `Irrigation auto-starts for ${durationInHours} hours`, data: newIrrigation });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// POST /api/irrigation/stop
exports.stopIrrigation = async (req, res) => {
    try {
        const { farmId } = req.body;

        const irrigation = await Irrigation.findOneAndUpdate(
            { farm: farmId, status: 'active' },
            { status: 'completed', stoppedAt: Date.now() },
            { new: true }
        );

        if (!irrigation) return res.status(404).json({ message: "No active irrigation found" });

        res.status(200).json({ message: "Irrigation stopped", data: irrigation });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// GET /api/irrigation/schedule
exports.getSchedule = async (req, res) => {
    try {
        const userFarms = await Farm.find({ farmer: req.user.userId }).select('_id');
        const farmIds = userFarms.map(farm => farm._id);

        const schedules = await Irrigation.find({ farm: { $in: farmIds } }).sort({ createdAt: -1 });
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};