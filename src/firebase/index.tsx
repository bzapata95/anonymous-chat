import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  //YUOR CREDENTIALS
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
