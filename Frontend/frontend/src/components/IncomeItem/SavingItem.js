import React from 'react';
import styled from 'styled-components';
import { trash, dollar } from '../../utils/icons';
import Button from '../button/button';

function SavingsItem({ id, goal, amount, targetAmount, deleteItem }) {
  const formattedAmount = parseFloat(amount).toLocaleString('en-IN');
  const formattedTarget = parseFloat(targetAmount).toLocaleString('en-IN');

  return (
    <SavingsItemStyled>
      <div className="content">
        <h5>{goal}</h5>
        <div className="details">
          <p>{dollar} {formattedAmount}</p>
          <p>🎯 {formattedTarget}</p>
        </div>
      </div>
      <div className="btn-con">
        <Button
          icon={trash}
          bPad={'1rem'}
          bRad={'50%'}
          bg={'var(--primary-color)'}
          color={'#fff'}
          iColor={'#fff'}
          hColor={'var(--color-green)'}
          onClick={() => deleteItem(id)}
        />
      </div>
    </SavingsItemStyled>
  );
}

const SavingsItemStyled = styled.div`
  background: #FCF6F9;
  border: 2px solid #FFFFFF;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #222260;

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h5 {
      font-size: 1.3rem;
      color: var(--primary-color);
      text-transform: capitalize;
    }

    .details {
      display: flex;
      gap: 2rem;

      p {
        color: var(--primary-color);
        opacity: 0.9;
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-weight: 500;
      }
    }
  }

  .btn-con {
    display: flex;
    align-items: center;
  }
`;

export default SavingsItem;
