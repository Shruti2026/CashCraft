const Saving = require('../models/SavingModel');

exports.addOrUpdateSaving = async (req, res) => {
  const { goal, amount, targetAmount } = req.body;

  if (!goal || !amount || !targetAmount) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existing = await Saving.findOne({ goal });

    if (existing) {
      existing.amount += amount;
      await existing.save();
      return res.status(200).json({ message: 'Saving goal updated' });
    }

    const newSaving = new Saving({ goal, amount, targetAmount });
    await newSaving.save();
    res.status(201).json({ message: 'Saving goal added' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getSavings = async (req, res) => {
  try {
    const savings = await Saving.find().sort({ createdAt: -1 });
    res.status(200).json(savings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
