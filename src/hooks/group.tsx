import React, { createContext, useContext, useState, useCallback } from 'react';
import { db } from '../firebase';

export interface GroupState {
  id: string;
  category: string;
}

interface GroupContextData {
  group: GroupState[];
  loadGroups(): Promise<void>;
}

const GroupContext = createContext<GroupContextData>({} as GroupContextData);

const ChatProvider: React.FC = ({ children }) => {
  const [group, setGroup] = useState<GroupState[]>([]);

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
          setGroup(arrayGroup);
        });
      });
  }, []);

  return (
    <GroupContext.Provider value={{ group, loadGroups }}>
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
