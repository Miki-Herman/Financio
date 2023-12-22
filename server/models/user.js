const mongoose = require('mongoose');

const user = new mongoose.Schema(
    {
        "id": { type: Number, required: true },
        "email": { type: String, required: true },
        "password": { type: Number, required: true },
        "role": { type: Number, required: true }
    }
)

module.exports = user
