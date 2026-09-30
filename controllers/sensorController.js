const Sensor = require('../models/Sensor');
const Farm = require('../models/Farm');

// POST /api/sensors (Add a new sensor to a farm)
exports.createSensor = async (req, res) => {
    try {
        const { name, sensorType, farmId } = req.body;

        // 1. Verify the farm actually exists and belongs to this logged-in farmer
        const farm = await Farm.findOne({ _id: farmId, farmer: req.user.userId });
        if (!farm) {
            return res.status(404).json({ message: "Farm not found or unauthorized" });
        }

        // 2. Create the sensor
        const newSensor = new Sensor({
            name,
            sensorType,
            farm: farmId
        });

        await newSensor.save();
        res.status(201).json({ message: "Sensor added successfully!", sensor: newSensor });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// GET /api/sensors (Get all sensors for the logged-in user's farms)
exports.getSensors = async (req, res) => {
    try {
        // First, find all farms owned by this farmer
        const userFarms = await Farm.find({ farmer: req.user.userId }).select('_id');
        const farmIds = userFarms.map(farm => farm._id);

        // Then, find all sensors that are linked to any of those farm IDs
        const sensors = await Sensor.find({ farm: { $in: farmIds } });
        res.status(200).json(sensors);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// DELETE /api/sensors/:id (Delete a sensor)
exports.deleteSensor = async (req, res) => {
    try {
        const deletedSensor = await Sensor.findByIdAndDelete(req.params.id);
        if (!deletedSensor) return res.status(404).json({ message: "Sensor not found" });
        
        res.status(200).json({ message: "Sensor deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};