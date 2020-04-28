import React from 'react';

import { AuthProvider } from './auth';
import { ChatProvider as GroupProvider } from './group';
import { ChatProvider } from './chat';
import { OneProvider } from './one';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <OneProvider>
      <GroupProvider>
        <ChatProvider>{children}</ChatProvider>
      </GroupProvider>
    </OneProvider>
  </AuthProvider>
);

export default AppProvider;
