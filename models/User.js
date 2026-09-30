const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true // Prevents two people from registering with the same email
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['farmer', 'expert'], // This restricts the role to only these two words
        default: 'farmer' 
    }
}, { 
    timestamps: true // Automatically adds 'createdAt' and 'updatedAt' dates
});

module.exports = mongoose.model('User', userSchema);