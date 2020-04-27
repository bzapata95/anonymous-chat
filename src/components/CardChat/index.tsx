import React from 'react';

import { Container } from './styles';

interface CardChatProps {
  url: string;
}

const CardChat: React.FC<CardChatProps> = ({ children, url }) => {
  return (
    <Container to={url} activeClassName="active">
      {children}
    </Container>
  );
};

export default CardChat;
