import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import CardChat from '../CardChat';

import { GroupState } from '../../hooks/group';
import { useAuth } from '../../hooks/auth';

import { Container, ContainerGroupChats } from './styles';

interface AsideOneToOneProps {
  urlPrefix: string;
  title: string;
  iconPlus?: boolean;
  items: Array<GroupState | any>;
}

function searchingFor(term: string): any {
  return (x: any) => {
    return x.to.name.toLowerCase().includes(term.toLowerCase()) || !term;
  };
}

const AsideOneToOne: React.FC<AsideOneToOneProps> = ({
  urlPrefix,
  title,
  iconPlus,
  items,
}) => {
  const [term, setTerm] = useState('');

  const { user } = useAuth();

  return (
    <Container>
      <div>
        <p>{title}</p>
        {iconPlus && (
          <div>
            <FiPlus size={18} color="#e5e5e5" />
          </div>
        )}
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
              key={item.key}
              url={`/${urlPrefix}/${item.key}/${item.doc}`}
            >
              {item.from.id === user.id && item.to.id !== user.id ? (
                <h1>{item.to.name.toUpperCase()}</h1>
              ) : (
                <h1>{item.from.name.toUpperCase()}</h1>
              )}
            </CardChat>
          ))}
      </ContainerGroupChats>
    </Container>
  );
};

export default AsideOneToOne;
