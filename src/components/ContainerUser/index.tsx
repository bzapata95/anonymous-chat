import React, { useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { uuid } from 'uuidv4';
import { FiSend } from 'react-icons/fi';

import { User, useAuth } from '../../hooks/auth';
import { useOne } from '../../hooks/one';

import { Container } from './styles';

interface ContainerUserProps {
  items: Array<User | any>;
}

const ContainerUser: React.FC<ContainerUserProps> = ({ items }) => {
  const history = useHistory();

  const { room } = useParams();
  const { user } = useAuth();
  const { registerRoom } = useOne();

  const hanldeSendPersonalMessage = useCallback(
    async (userTo: User) => {
      const from = { id: user.id, name: user.name };
      const to = { id: userTo.id, name: userTo.name };
      const key = uuid();

      await registerRoom({ from, to, key });

      history.push(`/individual-chat/${key}`);
    },

    [user.id, history, registerRoom, user.name],
  );

  return (
    <Container>
      {room && (
        <>
          <header>Usuarios</header>

          <ul>
            {items &&
              items.map((item) => (
                <li key={item.id}>
                  {item.name}
                  {item.id !== user.id && (
                    <FiSend
                      size={20}
                      color="#21e181"
                      onClick={() => hanldeSendPersonalMessage(item)}
                    />
                  )}
                </li>
              ))}
          </ul>
        </>
      )}
    </Container>
  );
};

export default React.memo(ContainerUser);
