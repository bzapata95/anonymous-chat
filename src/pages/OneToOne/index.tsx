import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import AsideOneToOne from '../../components/AsideOneToOne';
import ContainerMessages from '../../components/ContainerMessage';
import FormSendMessage from '../../components/FormSendMessage';

import { useOne } from '../../hooks/one';

import { Container, Content, Main } from './styles';

const OneToOne: React.FC = () => {
  const { room, doc } = useParams();
  const { chats, getMessageToRoom, loadChats, messages } = useOne();

  useEffect(() => {
    room && getMessageToRoom(`${doc}`);
  }, [room, getMessageToRoom, doc]);

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  return (
    <Container>
      <header>
        <h1>Chat individuales</h1>
        <Link to="/dashboard">
          <FiArrowLeft size={20} color="#7159c1" />
          Volver al dashboard
        </Link>
      </header>
      <Content>
        <AsideOneToOne
          urlPrefix="individual-chat"
          title="Chats"
          items={chats}
        />
        <Main>
          {room ? (
            <>
              <ContainerMessages items={messages} />
              <FormSendMessage />
            </>
          ) : null}
        </Main>
      </Content>
    </Container>
  );
};

export default OneToOne;
