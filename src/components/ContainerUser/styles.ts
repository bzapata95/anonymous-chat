import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

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

export const Container = styled.div`
  width: 220px;
  padding: 24px;
  border-left: 1px solid ${shade(0.2, '#19181f')};

  header {
    font-weight: bold;
    font-size: 12px;
    text-transform: uppercase;
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
