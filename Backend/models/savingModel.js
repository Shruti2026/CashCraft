const mongoose = require('mongoose');

const SavingSchema = new mongoose.Schema({
  goal: { type: String, required: true, trim: true },
  amount: { type: Number, required: true },
  targetAmount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Saving', SavingSchema);
