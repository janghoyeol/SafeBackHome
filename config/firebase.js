import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, getDocs, deleteDoc  } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const db = getFirestore(app);

const auth = getAuth(app);

export {
  db,
  auth,
  collection,
  addDoc,
  doc,
  getDocs,
  deleteDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
};
