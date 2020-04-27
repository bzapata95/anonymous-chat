import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useChat } from '../../hooks/chat';

import { Container } from './styles';

const FormSendMessage: React.FC = () => {
  const { doc } = useParams();

  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState('');

  const { user } = useAuth();
  const { sendMessage } = useChat();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await sendMessage(user, input, `${doc}`);
      setInput('');
    },
    [input, sendMessage, user, doc],
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
