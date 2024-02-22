// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDiGVqZY_vrx3_1gnsrxJc0tpNORXV66AI',
  authDomain: 'socket-a1085.firebaseapp.com',
  dataBaseURL:"https://socket-a1085-default-rtdb.firebaseio.com/",
  projectId: 'socket-a1085',
  storageBucket: 'socket-a1085.appspot.com',
  messagingSenderId: '386388441016',
  appId: '1:386388441016:web:e26cfa4d31cd4850d8c14d',
  measurementId: 'G-7Z7YCJ7BPK'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const dataBase = getDatabase(app)
// Initialize Firestore
const firestore = getFirestore(app);

export { firestore ,dataBase,app};
