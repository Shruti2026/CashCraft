const Saving = require('../models/savingModel');

// Get all savings
const getSavings = async (req, res) => {
  try 
  {
    const savings = await Saving.find();
    res.status(200).json(savings);
  } 
  catch (error) 
  {
    res.status(500).json({ message: 'Error fetching savings', error });
  }
};

// Add or update a saving (by goal name)
const addOrUpdateSaving = async (req, res) => {
  const { goal, amount, targetAmount } = req.body;

  if (!goal || amount == null || targetAmount == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    let existing = await Saving.findOne({ goal });

    if (existing) {
      existing.amount += amount;
      existing.targetAmount = targetAmount; // Optional: update target if needed
      await existing.save();
      return res.status(200).json({ message: 'Saving updated' });
    }

    const newSaving = new Saving({ goal, amount, targetAmount });
    await newSaving.save();
    res.status(201).json({ message: 'Saving added' });

  } catch (error) {
    res.status(500).json({ message: 'Error saving data', error });
  }
};

// Delete saving by ID
const deleteSaving = async (req, res) => {
  const { id } = req.params;

  try {
    await Saving.findByIdAndDelete(id);
    res.status(200).json({ message: 'Saving deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting saving', error });
  }
};

module.exports = {
  getSavings,
  addOrUpdateSaving,
  deleteSaving
};
