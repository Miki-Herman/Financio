const mongoose = require('mongoose');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const user = new mongoose.Schema(
    {
        "id": { type: Number, required: true },
        email: { 
            type: String, 
            required: true,
            validate: {
                validator: function(email) {
                    return emailRegex.test(email);
                },
                message: props => `${props.value} is not a valid email address!`
            }
        },
        "password": { type: String, required: true },
        "role": { type: Number, required: true }
    }
)

module.exports = mongoose.model('User', user);
