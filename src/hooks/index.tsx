import React from 'react';

import { AuthProvider } from './auth';
import { ChatProvider as GroupProvider } from './group';
import { ChatProvider } from './chat';

const AppProvider: React.FC = ({ children }) => (
  <GroupProvider>
    <ChatProvider>
      <AuthProvider>{children}</AuthProvider>
    </ChatProvider>
  </GroupProvider>
);

export default AppProvider;
