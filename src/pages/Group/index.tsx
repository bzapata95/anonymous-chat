import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import Aside from '../../components/Aside';
import ContainerMessages from '../../components/ContainerMessage';
import FormSendMessage from '../../components/FormSendMessage';
import ContainerUser from '../../components/ContainerUser';

import { useGroup } from '../../hooks/group';
import { useChat } from '../../hooks/chat';

import { Container, Content, Main } from './styles';

const Group: React.FC = () => {
  const { category } = useParams();
  const { group, loadGroups } = useGroup();
  const { users, getMessagesForCategory, messages } = useChat();

  useEffect(() => {
    category && getMessagesForCategory(`${category}`);
  }, [category, getMessagesForCategory]);

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
        <Aside title="categorias" iconPlus items={group} />
        <Main>
          {category ? (
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
