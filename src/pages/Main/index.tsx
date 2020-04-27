import React, { useState, useCallback } from 'react';

import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

const Main: React.FC = () => {
  const [name, setName] = useState('anonymous');

  const [isFocused, setIsFocused] = useState(false);

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      signIn({ name });
    },
    [name, signIn],
  );

  const handleInput = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <>
      <Container isFocused={isFocused}>
        <h1>Bienvenidos a Anonymous Chat</h1>

        <p>Tu nombre</p>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={name}
            onChange={handleInput}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Ingresa tu nombre para mostrar"
          />
          <button type="submit">Go</button>
        </form>
      </Container>
    </>
  );
};

export default Main;
