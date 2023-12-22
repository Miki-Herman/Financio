const mongoose = require('mongoose');

const transactionType = new mongoose.Schema(
    {
        "id": { type: Number, required: true },
        "name": { type: String, required: true },
        "color": { type: String, required: true },
        "icon": { type: String, required: true }
    }
)

module.exports = transactionType
