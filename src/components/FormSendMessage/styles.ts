import styled, { css } from 'styled-components';

interface FormProps {
  isFocused: boolean;
}

export const Container = styled.form<FormProps>`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: 46px;

  display: flex;
  align-items: center;

  input {
    flex: 1;
    height: 100%;
    padding: 0 24px;

    background: #19181f;
    border: 1px solid #19181f;

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
    width: 100px;
    background: #7159c1;
    border: none;
    height: 100%;

    color: #e5e5e5;
    font-weight: bold;
    padding: 0 12px;
    border-radius: 0 0 5px 0;
  }
`;
