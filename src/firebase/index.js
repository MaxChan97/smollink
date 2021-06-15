import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDNoIUkXecqpwOlZFey_sDA9glGlTv0bO4',
  authDomain: 'url-shortener-afee5.firebaseapp.com',
  projectId: 'url-shortener-afee5',
  storageBucket: 'url-shortener-afee5.appspot.com',
  messagingSenderId: '142883085716',
  appId: '1:142883085716:web:dcc694084c575807c04381',
  measurementId: 'G-FD5VYNSL7Z',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db, firebase as default };
