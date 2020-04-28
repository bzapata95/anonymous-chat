import React, { createContext, useContext, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../firebase';

import { Message } from './chat';

export interface GroupState {
  id: string;
  category: string;
}

interface GroupContextData {
  group: GroupState[];
  createGroup(category: string): Promise<void>;
  loadGroups(): Promise<void>;
}

const GroupContext = createContext<GroupContextData>({} as GroupContextData);

const ChatProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const [group, setGroup] = useState<GroupState[]>([]);

  const createGroup = useCallback(
    async (category: string) => {
      await db
        .collection('groups')
        .add({
          category: category.toLowerCase(),
          messages: [],
        })
        .then(function (docRef) {
          history.push(`/group-chat/${docRef.id}`);
          setGroup((state) => [
            ...state,
            {
              category: category.toLowerCase(),
              id: docRef.id,
            },
          ]);
        });
    },
    [history],
  );

  const loadGroups = useCallback(async () => {
    const arrayGroup: GroupState[] = [];
    await db
      .collection('groups')
      .get()
      // eslint-disable-next-line func-names
      .then(function (querySnapshot) {
        // eslint-disable-next-line func-names
        querySnapshot.forEach(function (doc) {
          arrayGroup.push({ id: doc.id, category: doc.data().category });
        });
      });
    setGroup(arrayGroup);
  }, []);

  return (
    <GroupContext.Provider value={{ group, createGroup, loadGroups }}>
      {children}
    </GroupContext.Provider>
  );
};

function useGroup(): GroupContextData {
  const context = useContext(GroupContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { ChatProvider, useGroup };
