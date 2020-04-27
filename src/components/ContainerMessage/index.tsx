import React from 'react';

import Message from '../Message';

import { Message as IMessage } from '../../hooks/chat';
import { Container } from './styles';

interface ContainerMessagesProps {
  items?: Array<IMessage>;
}

const ContainerMessages: React.FC<ContainerMessagesProps> = ({ items }) => {
  return (
    <Container>
      {items &&
        items.map((message) => <Message key={message.key} message={message} />)}
    </Container>
  );
};

export default ContainerMessages;
