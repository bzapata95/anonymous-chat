import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDEEB_9pk5uiu62GkIdwjccVXkwxfZRXAk',
  authDomain: 'anonymous-chat-e91e4.firebaseapp.com',
  databaseURL: 'https://anonymous-chat-e91e4.firebaseio.com',
  projectId: 'anonymous-chat-e91e4',
  storageBucket: 'anonymous-chat-e91e4.appspot.com',
  messagingSenderId: '52334918507',
  appId: '1:52334918507:web:1190139c2dcbaa93842a2e',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
