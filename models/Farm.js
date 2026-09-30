const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    sizeInAcres: { 
        type: Number, 
        required: true 
    },
    sensorIds: [{ 
        type: String // An array of strings to hold multiple sensor IDs[cite: 3]
    }],
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This creates a strict link to the User model
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Farm', farmSchema);