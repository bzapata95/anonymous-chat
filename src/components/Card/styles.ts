import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
  background: #25242c;
  border-radius: 10px;
  padding: 50px;
  text-decoration: none;
  color: #e5e5e5;
  border: 3px solid #25242c;

  display: flex;
  flex-direction: column;
  align-items: center;
  transition: border-color 0.2s ease-in-out;

  &:hover {
    border-color: #7159c1;
  }

  svg {
    margin-bottom: 14px;
  }

  & + div {
    margin-right: 20px;
  }
`;
