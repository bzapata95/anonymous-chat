import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import CardChat from '../CardChat';

import { GroupState } from '../../hooks/group';

import { Container, ContainerGroupChats } from './styles';

interface AsideProps {
  title: string;
  iconPlus?: boolean;
  items: Array<GroupState | any>;
}

function searchingFor(term: string): any {
  return (x: any) => {
    return x.category.includes(term) || !term;
  };
}

const Aside: React.FC<AsideProps> = ({ title, iconPlus, items }) => {
  const [term, setTerm] = useState('');

  return (
    <Container>
      <div>
        <p>{title}</p>
        <div>{iconPlus && <FiPlus size={18} color="#e5e5e5" />}</div>
      </div>
      <form>
        <input
          type="text"
          name="term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Buscar"
          autoComplete="off"
        />
      </form>

      <ContainerGroupChats>
        {items &&
          items.filter(searchingFor(term)).map((item) => (
            <CardChat
              key={item.id}
              url={`/group-chat/${item.category}/${item.id}`}
            >
              <h1>{item.category.toUpperCase()}</h1>
            </CardChat>
          ))}
      </ContainerGroupChats>
    </Container>
  );
};

export default Aside;
