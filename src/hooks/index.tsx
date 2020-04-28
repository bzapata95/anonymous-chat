import React from 'react';

import { AuthProvider } from './auth';
import { ChatProvider as GroupProvider } from './group';
import { ChatProvider } from './chat';
import { OneProvider } from './one';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <GroupProvider>
      <ChatProvider>
        <OneProvider>{children}</OneProvider>
      </ChatProvider>
    </GroupProvider>
  </AuthProvider>
);

export default AppProvider;
