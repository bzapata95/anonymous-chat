import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { uuid } from 'uuidv4';
import { FiSend } from 'react-icons/fi';

import { User, useAuth } from '../../hooks/auth';
import { useOne } from '../../hooks/one';

import { Container } from './styles';

interface ContainerUserProps {
  items: Array<User | any>;
}

function searchingFor(term: string): any {
  return (x: any) => {
    return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
  };
}

const ContainerUser: React.FC<ContainerUserProps> = ({ items }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [term, setTerm] = useState('');

  const { room } = useParams();
  const { user } = useAuth();
  const { registerRoom, chats, loadChats } = useOne();

  const hanldeSendPersonalMessage = useCallback(
    async (userTo: User) => {
      const from = { id: user.id, name: user.name };
      const to = { id: userTo.id, name: userTo.name };
      const key = uuid();

      await registerRoom({ from, to, key });
    },

    [user.id, registerRoom, user.name],
  );

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const stringArrayUserIdOfOneToOne = useMemo(() => {
    return chats.map((chat) => chat.to.id);
  }, [chats]);

  return (
    <Container isFocused={isFocused}>
      {room && (
        <>
          <header>Usuarios</header>

          <input
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            name="term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Buscar usuario"
            autoComplete="off"
          />

          <ul>
            {items &&
              items.filter(searchingFor(term)).map((item) => (
                <li key={item.id}>
                  {item.name}
                  {item.id !== user.id &&
                  !stringArrayUserIdOfOneToOne.includes(item.id) ? (
                    <FiSend
                      size={20}
                      color="#21e181"
                      onClick={() => hanldeSendPersonalMessage(item)}
                    />
                  ) : null}
                </li>
              ))}
          </ul>
        </>
      )}
    </Container>
  );
};

export default React.memo(ContainerUser);
