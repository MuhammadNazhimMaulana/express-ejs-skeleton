const mongoose = require('mongoose');

// Skema User
const userSchema = new mongoose.Schema({ 
    username: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User