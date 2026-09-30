const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    sensorType: { 
        type: String, 
        enum: ['moisture', 'temperature'], // Restricting to only these two types
        required: true 
    },
    farm: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Farm', // Links this sensor to a specific farm we created earlier
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Sensor', sensorSchema);