const Expense = require("../models/expenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date, type } = req.body;

  try {
    const numericAmount = Number(amount);

    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ message: "Input a positive amount" });
    }

    const expense = new Expense({
      title,
      amount: numericAmount,
      category,
      description,
      date,
      type,
      user: req.user.id,
    });

    await expense.save();
    res.status(200).json({ message: "Expense added", expense });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    await Expense.findByIdAndDelete(id);
    res.status(200).json({ message: "Expense Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
