import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updatePassword
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_oL4Y3YRYyJdZboJ-vcIqusNx82IDS5Y",
  authDomain: "desikart-cuisine.firebaseapp.com",
  projectId: "desikart-cuisine",
  storageBucket: "desikart-cuisine.firebasestorage.app",
  messagingSenderId: "930649466567",
  appId: "1:930649466567:web:64a8b7fe0ed77308880e2",
  measurementId: "G-MH7F537L17"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updatePassword,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
};