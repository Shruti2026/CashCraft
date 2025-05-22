import React from 'react';
import styled from 'styled-components';
import Navigation from '../Navigation/Navigation';
import bgImage from '../../img/bg.png'; 

const MainLayout = ({ active, setActive, children }) => {
  return (
    <MainLayoutStyled>
      <Navigation active={active} setActive={setActive} />
      <main>
        {children}
      </main>
    </MainLayoutStyled>
  );
};

const MainLayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;

  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-size: cover;
  backgroundPosition: 'center',

  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  overflow-x: hidden;

  main {
    flex: 1;
    width: 100%;
    &::-webkit-scrollbar {
      width: 0;
    }
  }+
`;

export default MainLayout;
