const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
    sensor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Sensor', 
        required: true 
    },
    moistureLevel: { 
        type: Number, 
        required: true 
    },
    temperature: { 
        type: Number, 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('SensorData', sensorDataSchema);