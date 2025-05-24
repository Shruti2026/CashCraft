import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../button/button";
import { plus } from "../../utils/icons";

const SavingForm = () => {
  const { addSaving, error, setError } = useGlobalContext();

  const [inputState, setInputState] = useState({
    goal: "",
    amount: "",
    targetAmount: "",
  });

  const { goal, amount, targetAmount } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!goal || !amount || !targetAmount) {
      setError("Please fill all the fields");
      return;
    }

    // Call addSaving (backend adds or updates)
    await addSaving({
      goal,
      amount: parseFloat(amount),
      targetAmount: parseFloat(targetAmount),
    });

    // Clear inputs after submit
    setInputState({
      goal: "",
      amount: "",
      targetAmount: "",
    });
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}

      <div className="input-control">
        <input
          type="text"
          value={goal}
          placeholder="Saving Goal"
          onChange={handleInput("goal")}
          required
        />
      </div>

      <div className="input-control">
        <input
          type="number"
          value={amount}
          placeholder="Amount"
          onChange={handleInput("amount")}
          required
          min="0"
          step="0.01"
        />
      </div>

      <div className="input-control">
        <input
          type="number"
          value={targetAmount}
          placeholder="Target Amount"
          onChange={handleInput("targetAmount")}
          required
          min="0"
          step="0.01"
        />
      </div>

      <div className="submit-btn">
        <Button
          name={"Add / Update"}
          icon={plus}
          bPad={".8rem 1.6rem"}
          bRad={"30px"}
          bg={"var(--color-accent)"}
          color={"#fff"}
        />
      </div>
    </FormStyled>
  );
};

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  input {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }

  .input-control {
    input {
      width: 100%;
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }

  .error {
    color: red;
    font-weight: 600;
    font-size: 1rem;
  }
`;

export default SavingForm;
