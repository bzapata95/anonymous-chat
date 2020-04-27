import React from 'react';
import { FiGrid, FiUsers } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import Card from '../../components/Card';

import { Container, HeaderContainer, MainContainer } from './styles';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <HeaderContainer>
        <h1>Dashboard</h1>
        <h2>Tu nombre: {user.name}</h2>
      </HeaderContainer>

      <MainContainer>
        <Card url="/group-chat">
          <FiGrid size={50} color="#e5e5e5" />
          <h2>Chat grupal</h2>
        </Card>

        <Card url="/individual-chat">
          <FiUsers size={50} color="#e5e5e5" />
          <h2>Chat individual</h2>
        </Card>
      </MainContainer>
    </Container>
  );
};

export default Dashboard;
