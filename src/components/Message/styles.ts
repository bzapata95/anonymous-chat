import styled, { keyframes, css } from 'styled-components';

interface MessageProps {
  isAuthor?: boolean;
}

const appearMessages = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.main<MessageProps>`
  position: relative;
  & + main {
    margin-top: 18px;
  }

  animation: ${appearMessages} 0.5s;

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  strong {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    color: #ccc;
    margin-bottom: 4px;
  }
  p {
    display: flex;
    align-items: center;

    svg {
      opacity: 0;
      visibility: hidden;
      margin-right: 10px;
      cursor: pointer;

      ${(props) =>
        !props.isAuthor &&
        css`
          order: 1;
          margin-left: 10px;
        `}

      transition: opacity 0.3s;
    }

    &:hover svg {
      opacity: 1;
      visibility: visible;
    }

    span {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      font-size: 14px;
      background: #19181f;
      border-radius: 20px;

      line-height: 20px;

      ${(props) =>
        props.isAuthor &&
        css`
          background: #7159c1;
        `}
    }
  }

  ${(props) =>
    props.isAuthor &&
    css`
      align-items: flex-end;
    `}
`;
