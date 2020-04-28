import React, { useState, useCallback } from 'react';
import { FiPlus } from 'react-icons/fi';

import CardChat from '../CardChat';

import { GroupState, useGroup } from '../../hooks/group';

import { Container, ContainerGroupChats } from './styles';

interface AsideProps {
  urlPrefix: string;
  title: string;
  iconPlus?: boolean;
  items: Array<GroupState>;
}

function searchingFor(term: string): any {
  return (x: any) => {
    return x.category.toLowerCase().includes(term.toLowerCase()) || !term;
  };
}

const AsideGroup: React.FC<AsideProps> = ({
  urlPrefix,
  title,
  iconPlus,
  items,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [term, setTerm] = useState('');

  const { createGroup } = useGroup();

  const hanldeAddGroup = useCallback(() => {
    const name = prompt('¿Nombre del grupo?');
    if (!name) {
      alert('Debe ingresar un nombre');
    } else {
      createGroup(name);
    }
  }, [createGroup]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <Container isFocused={isFocused}>
      <div>
        <p>{title}</p>
        {iconPlus && (
          <div>
            <FiPlus size={18} color="#e5e5e5" onClick={hanldeAddGroup} />
          </div>
        )}
      </div>
      <form>
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
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
            <CardChat key={item.id} url={`/${urlPrefix}/${item.id}`}>
              <h1>{item.category.toUpperCase()}</h1>
            </CardChat>
          ))}
      </ContainerGroupChats>
    </Container>
  );
};

export default AsideGroup;
