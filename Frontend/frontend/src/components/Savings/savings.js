import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Savings() {
  const [goal, setGoal] = useState('');
  const [amount, setAmount] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [savings, setSavings] = useState([]);

  const fetchSavings = async () => {
    const { data } = await axios.get('/api/v1/get-savings');
    setSavings(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post('/api/v1/add-saving', {
      goal,
      amount: Number(amount),
      targetAmount: Number(targetAmount)
    });
    fetchSavings();
    setGoal('');
    setAmount('');
    setTargetAmount('');
  };

  useEffect(() => {
    fetchSavings();
  }, []);

  return (
    <div className="savings-page">
      <h2>Savings Goals</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Goal Name"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          required
        />
        <button type="submit">Add/Update</button>
      </form>

      <ul>
        {savings.map((save) => (
          <li key={save._id}>
            <strong>{save.goal}</strong> - ₹{save.amount} / ₹{save.targetAmount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Savings;