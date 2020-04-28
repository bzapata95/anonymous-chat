import React, { useCallback, useState } from 'react';
import { isUuid } from 'uuidv4';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useChat } from '../../hooks/chat';
import { useOne } from '../../hooks/one';

import { Container } from './styles';

const FormSendMessage: React.FC = () => {
  const { room, doc } = useParams();

  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState('');

  const { user } = useAuth();
  const { sendMessage } = useChat();
  const { sendMessageOneToOne } = useOne();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isUuid(`${room}`)) {
        sendMessageOneToOne(input, `${doc}`);
      } else {
        await sendMessage(user, input, `${room}`);
      }
      setInput('');
    },
    [input, sendMessage, user, room, sendMessageOneToOne, doc],
  );

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <Container isFocused={isFocused} onSubmit={handleSubmit}>
      <input
        name="message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Tu mensaje..."
        autoComplete="off"
      />
      <button type="submit">Enviar</button>
    </Container>
  );
};

export default React.memo(FormSendMessage);
