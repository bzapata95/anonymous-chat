import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled(NavLink)`
  width: 100%;
  background: #25242c !important;
  margin-top: 16px;

  display: flex;
  padding: 24px !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;

  text-decoration: none;

  &.active {
    h1 {
      color: #21e181 !important;
    }
  }

  h1 {
    color: #e5e5e5 !important;
    font-size: 18px;
    margin-bottom: 0 !important;
  }
`;
