import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1300px;
  padding: 0 24px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      color: #7159c1;
      margin-bottom: 24px;
    }

    a {
      display: inline-block;
      text-decoration: none;
      color: #7159c1;
      display: flex;
      align-items: center;
      svg {
        margin-right: 10px;
      }
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 800px;

  background: #25242c;
  border-radius: 5px;
  display: flex;
`;

export const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;
