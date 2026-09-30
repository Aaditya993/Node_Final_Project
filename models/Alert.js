const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
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
        enum: ['pest', 'weather', 'moisture'], 
        required: true 
    },
    isRead: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);