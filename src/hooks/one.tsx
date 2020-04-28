import React, { createContext, useContext, useState, useCallback } from 'react';
import { uuid } from 'uuidv4';
import { db } from '../firebase';

import { User, useAuth } from './auth';
import { Message } from './chat';

interface RoomData {
  doc: string;
  from: User;
  to: User;
  key: string;
  messages: Message[];
}

interface OneStateContent {
  participants: string[];
  messages: object[];
}

interface DTOCreate {
  from: User;
  to: User;
  key: string;
}

interface OneContextData {
  chats: Array<RoomData>;
  messages: Message[];
  loadChats(): Promise<void>;
  registerRoom({ from, to }: DTOCreate): Promise<void>;
  sendMessageOneToOne(message: string, room: string): Promise<void>;
  getMessageToRoom(key: string): void;
  deleteMessage(key: string, doc: string, idUser: string): Promise<void>;
}

const OneContext = createContext<OneContextData>({} as OneContextData);

const OneProvider: React.FC = ({ children }) => {
  const [chats, setChats] = useState<RoomData[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();

  const loadChats = useCallback(async () => {
    if (user) {
      const arrayGroup1: RoomData[] = [];
      const arrayGroup2: RoomData[] = [];

      await db
        .collection('onetoone')
        .where('from.id', '==', `${user.id}`)
        .get()
        // eslint-disable-next-line func-names
        .then(function (querySnapshot) {
          // eslint-disable-next-line func-names
          querySnapshot.forEach(function (doc) {
            arrayGroup1.push({
              doc: doc.id,
              key: doc.data().key,
              from: doc.data().from,
              to: doc.data().to,
              messages: doc.data().messages,
            });
          });
        });

      await db
        .collection('onetoone')
        .where('to.id', '==', `${user.id}`)
        .get()
        // eslint-disable-next-line func-names
        .then(function (querySnapshot) {
          // eslint-disable-next-line func-names
          querySnapshot.forEach(function (doc) {
            arrayGroup2.push({
              doc: doc.id,
              key: doc.data().key,
              from: doc.data().from,
              to: doc.data().to,
              messages: doc.data().messages,
            });
          });
        });
      setChats([...arrayGroup1, ...arrayGroup2]);
    }
  }, [user]);

  const registerRoom = useCallback(async ({ from, to, key }: DTOCreate) => {
    const data = {
      from,
      to,
      key,
      messages: [],
    };

    db.collection('onetoone').add({ ...data });
  }, []);

  const sendMessageOneToOne = useCallback(
    async (message: string, room: string) => {
      const newMessage: Message = {
        key: uuid(),
        ...user,
        message,
        created_at: new Date(),
        delete: [],
      };
      setMessages((state) => [...state, newMessage]);

      const groupRef = db.collection('onetoone').doc(`${room}`);

      await groupRef.set(
        {
          messages: [...messages, newMessage],
        },
        { merge: true },
      );
    },
    [messages, user],
  );

  const getMessageToRoom = useCallback(async (docChat: string) => {
    const docRef = db.collection('onetoone').doc(`${docChat}`);

    // eslint-disable-next-line func-names
    await docRef.get().then(function (doc) {
      if (doc.exists) {
        const data = doc.data();
        setMessages(data?.messages);
      }
    });
  }, []);

  const deleteMessage = useCallback(
    async (key: string, doc: string, idUser: string) => {
      const indexMessage = messages.findIndex((message) => message.key === key);

      const newArray = [...messages];

      newArray[indexMessage] = {
        ...newArray[indexMessage],
        delete: [...newArray[indexMessage].delete, `${idUser}`],
      };

      setMessages(newArray);

      const groupRef = db.collection('onetoone').doc(`${doc}`);

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
    <OneContext.Provider
      value={{
        messages,
        chats,
        loadChats,
        registerRoom,
        sendMessageOneToOne,
        getMessageToRoom,
        deleteMessage,
      }}
    >
      {children}
    </OneContext.Provider>
  );
};

function useOne(): OneContextData {
  const context = useContext(OneContext);

  if (!context) {
    throw new Error('useOne must be used within an OneProvider');
  }
  return context;
}

export { OneProvider, useOne };
