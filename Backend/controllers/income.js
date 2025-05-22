const Income = require("../models/incomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date, type } = req.body;

  try {
    // Convert amount to a number safely
    const numericAmount = Number(amount);

    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ message: "Input a positive amount" });
    }

    const income = new Income({
      title,
      amount: numericAmount, // Store as a number
      category,
      description,
      date,
      type,
      user: req.user.id,
    });

    await income.save();
    res.status(200).json({ message: "Income added", income });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    await Income.findByIdAndDelete(id);
    res.status(200).json({ message: "Income Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
