import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: 1100px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  h1 {
    color: #7159c1;
  }

  p {
    margin-top: 24px;
    margin-bottom: 12px;
    font-size: 16px;
  }
  form {
    width: 400px;

    display: flex;

    input {
      width: 300px;
      height: 53px;
      background: #19181f;
      border: 1px solid #25242c;
      border-radius: 5px 0 0 5px;

      ${(props) =>
        props.isFocused &&
        css`
          border-color: #7159c1;
        `}

      padding: 0 24px;
      color: #e5e5e5;
      font-size: 14px;
    }

    button {
      width: 50px;
      flex: 1;
      background: #7159c1;
      color: #e5e5e5;
      font-weight: bold;
      border-radius: 0 5px 5px 0;
      border: none;
    }
  }
`;
