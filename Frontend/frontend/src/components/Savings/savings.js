import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/layouts';
import SavingForm from '../Form/SavingForm';
import { dollar } from '../../utils/icons';
import SavingItem from '../IncomeItem/SavingItem'; 

function Savings() {
    const { addSaving, savings, getSavings, deleteSaving, totalSavings } = useGlobalContext();

    useEffect(() => {
        getSavings();
    }, []);

    const deleteButton = (onClick) => (
        <button
            onClick={onClick}
            style={{
                backgroundColor: '#007BFF',
                border: 'none',
                borderRadius: '50%',
                padding: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <i className="fa-solid fa-trash" style={{ color: 'white', fontSize: '16px' }}></i>
        </button>
    );

    return (
        <SavingsStyled>
            <InnerLayout>
                <h1>Savings</h1>
                <h2 className="total-saving">Total Savings: <span>{dollar} {totalSavings()}</span></h2>
                <div className="saving-content">
                    <div className="form-container">
                        <SavingForm />
                    </div>
                    <div className="savings">
                      {savings.map((saving) => {
                        const { _id, goal, amount, targetAmount } = saving;
                        return (
                          <SavingItem
                            key={_id}
                            id={_id}
                            goal={goal}
                            amount={amount}
                            targetAmount={targetAmount}
                            deleteItem={deleteSaving}
                          />
                        );
                      })}
                    </div>
                </div>
            </InnerLayout>
        </SavingsStyled>
    );
}

const SavingsStyled = styled.div`
    display: flex;
    overflow: auto;
    font-family: 'Times New Roman', Times, serif;

    .total-saving {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;

        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-blue);
        }
    }

    .saving-content {
        display: flex;
        gap: 2rem;

        .savings {
            flex: 1;
        }
    }
`;

export default Savings;
