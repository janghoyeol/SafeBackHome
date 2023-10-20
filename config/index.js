import { Images } from './images';
import { Colors } from './theme';
import { db, auth, collection, addDoc, doc, getDocs,
    setDoc, deleteDoc, signOut,
    createUserWithEmailAndPassword, onAuthStateChanged } from './firebase';

export { Images, Colors, db, auth, collection, addDoc, doc, setDoc, getDocs, signOut, deleteDoc, onAuthStateChanged, createUserWithEmailAndPassword };
