const mongoose = require('mongoose');

const adviceSchema = new mongoose.Schema({
    expert: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    farm: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Farm', 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['fertilizer', 'crop_health', 'general'], 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Advice', adviceSchema);