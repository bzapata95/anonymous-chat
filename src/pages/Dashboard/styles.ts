import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 900px;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    color: #7159c1;
  }
`;

export const MainContainer = styled.div`
  width: 100%;
  max-width: 700px;
  height: 400px;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;
