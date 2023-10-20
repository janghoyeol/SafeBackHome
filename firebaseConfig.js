import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDDLd9BqDenAFef-OuF2zBS2JNVerR1G-M",
  authDomain: "calendarrecipe.firebaseapp.com",
  projectId: "calendarrecipe",
  storageBucket: "calendarrecipe.appspot.com",
  messagingSenderId: "600725474057",
  appId: "1:600725474057:web:339ef0d9d179265d9721d8",
  measurementId: "G-JL9NRBNN82"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
