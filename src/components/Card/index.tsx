import React from 'react';

import { Container } from './styles';

interface CardProps {
  url: string;
}

const Card: React.FC<CardProps> = ({ children, url }) => (
  <Container to={url}>{children}</Container>
);

export default Card;
