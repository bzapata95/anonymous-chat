import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import AsideGroup from '../../components/Aside';
import ContainerMessages from '../../components/ContainerMessage';
import FormSendMessage from '../../components/FormSendMessage';
import ContainerUser from '../../components/ContainerUser';

import { useGroup } from '../../hooks/group';
import { useChat } from '../../hooks/chat';

import { Container, Content, Main } from './styles';

const Group: React.FC = () => {
  const { room } = useParams();
  const { group, loadGroups } = useGroup();
  const { users, getMessagesForCategory, messages } = useChat();

  useEffect(() => {
    room && getMessagesForCategory(`${room}`);
  }, [room, getMessagesForCategory]);

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  return (
    <Container>
      <header>
        <h1>Chat grupales</h1>
        <Link to="/dashboard">
          <FiArrowLeft size={20} color="#7159c1" />
          Volver al dashboard
        </Link>
      </header>
      <Content>
        <AsideGroup
          urlPrefix="group-chat"
          title="categorias"
          iconPlus
          items={group}
        />
        <Main>
          {room ? (
            <>
              <ContainerMessages items={messages} />
              <FormSendMessage />
            </>
          ) : null}
        </Main>

        <ContainerUser items={users} />
      </Content>
    </Container>
  );
};

export default Group;
