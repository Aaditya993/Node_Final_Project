const mongoose = require('mongoose');

const irrigationSchema = new mongoose.Schema({
    farm: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Farm', 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['active', 'completed', 'scheduled'], 
        default: 'active' 
    },
    durationInHours: { 
        type: Number 
    },
    startedAt: { 
        type: Date, 
        default: Date.now 
    },
    stoppedAt: { 
        type: Date 
    }
}, { timestamps: true });

module.exports = mongoose.model('Irrigation', irrigationSchema);