import styled from 'styled-components';

export const Container = styled.aside`
  background: #19181f;
  padding: 24px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      text-transform: uppercase;
      font-size: 11px;
      font-weight: bold;
    }

    div {
      background: #7159c1;
      border-radius: 5px;
      border: none;
      padding: 2px;
      cursor: pointer;
    }
  }
  form {
    display: flex;
    margin-top: 18px;

    input {
      height: 53px;
      background: #19181f;
      border: 1px solid #25242c;
      border-radius: 5px;

      padding: 0 24px;
      color: #e5e5e5;
      font-size: 14px;
    }
  }
`;

export const ContainerGroupChats = styled.section`
  display: flex;
  flex-direction: column;
  height: 550px;

  overflow-y: auto;
`;
