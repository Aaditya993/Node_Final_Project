const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    plantDate: { 
        type: Date, 
        required: true 
    },
    expectedHarvestDate: { 
        type: Date, 
        required: true 
    },
    farm: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Farm', 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Crop', cropSchema);