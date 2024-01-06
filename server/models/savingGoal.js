const mongoose = require('mongoose');

const savingGoalSchema = new mongoose.Schema({
  "id": { type: Number, required: true },
  "goal": { type: Number, required: true },
  "saved": { type: Number, required: true },
  "userId": { type: Number, required: true }
});

module.exports = mongoose.model("savingGoal", savingGoalSchema);
