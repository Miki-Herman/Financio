const mongoose = require('mongoose');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const user = new mongoose.Schema(
    {
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
        password: { 
            type: String, 
            required: function() {
                return !this.isGoogleUser;
            }
        },
        googleId: {
            type: String,
            required: function() {
                return this.isGoogleUser;
            }
        },
        isGoogleUser: { type: Boolean, required: true, default: false }
    }
)

module.exports = mongoose.model('User', user);
