import styled, { keyframes, css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  isFocused: boolean;
}

const apperarUsers = keyframes`
  from {
    opacity: 0;
    transform: translateX(15px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.div<ContainerProps>`
  width: 220px;
  padding: 24px;
  border-left: 1px solid ${shade(0.2, '#19181f')};

  header {
    font-weight: bold;
    font-size: 12px;
    text-transform: uppercase;
  }

  input {
    width: 100%;
    background: #19181f;
    border: 1px solid #25242c;
    border-radius: 5px;
    padding: 12px;
    color: #e5e5e5;
    font-size: 14px;
    margin-top: 12px;

    ${(props) =>
      props.isFocused &&
      css`
        border-color: #7159c1;
      `}
  }

  ul {
    margin-top: 20px;
    list-style: none;

    li {
      animation: ${apperarUsers} 0.5s;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      svg {
        cursor: pointer;
      }

      & + li {
        margin-top: 10px;
      }
    }
  }
`;
