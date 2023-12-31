const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        "id": { type: Number, required: true },
        "amount": { type: Number, required: true },
        "category": { type: String, required: true },
        "description": { type: String, required: true },
        "date": { type: Date, required: true },
        "userId": { type: Number, required: true }
    }
)

module.exports = mongoose.model("Transaction", transactionSchema)
