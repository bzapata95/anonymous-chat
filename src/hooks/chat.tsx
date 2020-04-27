import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { uuid } from 'uuidv4';
import { db } from '../firebase';

import { User } from './auth';

export interface Message {
  key: string;
  id: string;
  name: string;
  message: string;
  created_at: object;
  delete?: Array<string>;
}

interface ChatContextData {
  messages: Message[];
  users: User[];
  getMessagesForCategory(category: string): Promise<void>;
  sendMessage(user: User, message: string, doc: string): Promise<void>;
  deleteMessage(key: string, doc: string, idUser: string): Promise<void>;
}

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

const ChatProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (messages) {
      const userArray: User[] = [];

      messages.map((message) => {
        return userArray.push({ id: message.id, name: message.name });
      });

      const jsonObject = userArray.map((user) => JSON.stringify(user));

      const uniqueSet = new Set(jsonObject);
      const uniqueArray = Array.from(uniqueSet).map((unique) =>
        JSON.parse(unique),
      );

      setUsers(uniqueArray);
    }
  }, [messages]);

  const getMessagesForCategory = useCallback(async (category: string) => {
    await db
      .collection('groups')
      .where('category', '==', `${category}`)
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.docs) {
          const data = querySnapshot.docs[0].data();
          setMessages(data.messages);
        }
      });
  }, []);

  const sendMessage = useCallback(
    async (user: User, message: string, doc: string) => {
      const newMessage: Message = {
        key: uuid(),
        ...user,
        message,
        created_at: new Date(),
        delete: [],
      };
      setMessages((state) => [...state, newMessage]);

      const groupRef = db.collection('groups').doc(`${doc}`);

      await groupRef.set(
        {
          messages: [...messages, newMessage],
        },
        { merge: true },
      );
    },
    [messages],
  );

  const deleteMessage = useCallback(
    async (key: string, doc: string, idUser: string) => {
      const indexMessage = messages.findIndex((message) => message.key === key);

      const newArray = [...messages];

      newArray[indexMessage] = {
        ...newArray[indexMessage],
        delete: [...newArray[indexMessage].delete, `${idUser}`],
      };

      setMessages(newArray);

      const groupRef = db.collection('groups').doc(`${doc}`);

      await groupRef.set(
        {
          messages: newArray,
        },
        { merge: true },
      );
    },
    [messages],
  );

  return (
    <ChatContext.Provider
      value={{
        messages,
        users,
        getMessagesForCategory,
        sendMessage,
        deleteMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

function useChat(): ChatContextData {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChat must be used within an ChatProvider');
  }
  return context;
}

export { ChatProvider, useChat };
