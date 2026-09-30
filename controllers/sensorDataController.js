const SensorData = require('../models/SensorData');
const Sensor = require('../models/Sensor');

// POST /api/sensor-data
exports.recordData = async (req, res) => {
    try {
        const { sensorId, moistureLevel, temperature } = req.body;
        
        // Check if the sensor actually exists
        const sensor = await Sensor.findById(sensorId);
        if (!sensor) return res.status(404).json({ message: "Sensor not found" });

        const newData = new SensorData({
            sensor: sensorId,
            moistureLevel,
            temperature
        });

        await newData.save();
        res.status(201).json({ message: "Sensor data recorded!", data: newData });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// GET /api/sensor-data
exports.getAllData = async (req, res) => {
    try {
        const data = await SensorData.find().populate('sensor', 'name sensorType');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// GET /api/sensor-data/sensor/:id
exports.getDataBySensor = async (req, res) => {
    try {
        const data = await SensorData.find({ sensor: req.params.id });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};