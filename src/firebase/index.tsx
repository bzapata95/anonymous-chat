import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: '', // YOUR CREDENTIALS*//,
  authDomain: '', // YOUR CREDENTIALS,
  databaseURL: '', // YOUR CREDENTIALS,
  projectId: '', // YOUR CREDENTIALS,
  storageBucket: '', // YOUR CREDENTIALS,
  messagingSenderId: '', // YOUR CREDENTIALS,
  appId: '', // YOUR CREDENTIALS,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
