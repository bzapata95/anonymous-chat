import React from 'react';
import { useParams } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';

import { User } from '../../hooks/auth';

import { Container } from './styles';

interface ContainerUserProps {
  items: Array<User | any>;
}

const ContainerUser: React.FC<ContainerUserProps> = ({ items }) => {
  const { category } = useParams();
  return (
    <Container>
      {category && (
        <>
          <header>Usuarios</header>

          <ul>
            {items &&
              items.map((item) => (
                <li key={item.id}>
                  {item.name} <FiSend size={20} color="#21e181" />
                </li>
              ))}
          </ul>
        </>
      )}
    </Container>
  );
};

export default React.memo(ContainerUser);
