import React, { useCallback, useMemo } from 'react';
import { isUuid } from 'uuidv4';
import { useParams } from 'react-router-dom';
import { FiXCircle } from 'react-icons/fi';
import { shade } from 'polished';

import { Message as IMessage, useChat } from '../../hooks/chat';
import { useAuth } from '../../hooks/auth';
import { useOne } from '../../hooks/one';

import { Container } from './styles';

interface MessageProps {
  message: IMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { room, doc } = useParams();

  const { deleteMessage } = useChat();
  const { deleteMessage: deleteMessageOneToOne } = useOne();
  const { user } = useAuth();

  const handleDelete = useCallback(
    (key: string) => {
      // eslint-disable-next-line no-alert
      const warn = window.confirm(
        '¿Estás seguro que quiere eliminar este mensaje?',
      );
      if (warn) {
        if (isUuid(`${room}`)) {
          deleteMessageOneToOne(key, `${doc}`, user.id);
        } else {
          deleteMessage(key, `${room}`, user.id);
        }
      }
    },
    [deleteMessage, doc, user.id, deleteMessageOneToOne, room],
  );

  const isAuthor = useMemo(() => {
    return message.id === user.id;
  }, [message.id, user.id]);

  const includeDelete = useMemo(() => {
    return message.delete?.includes(user.id);
  }, [message.delete, user.id]);

  return (
    <Container isAuthor={isAuthor}>
      <strong>{message.name}</strong>
      {includeDelete ? (
        <p>
          <span style={{ color: shade(0.3, '#e5e5e5') }}>
            <i>Mensaje eliminado</i>
          </span>
        </p>
      ) : (
        <p>
          <FiXCircle
            onClick={() => handleDelete(message.key)}
            size={20}
            color="#ccc"
          />
          <span>{message.message}</span>
        </p>
      )}
    </Container>
  );
};

export default React.memo(Message);
