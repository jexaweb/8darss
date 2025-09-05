import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTM65xTlT3KLutQAy8BBkD5OyQXpPdlsU",
  authDomain: "read-valci.firebaseapp.com",
  projectId: "read-valci",
  storageBucket: "read-valci.firebasestorage.app",
  messagingSenderId: "174372459536",
  appId: "1:174372459536:web:0e763efebfa62323016695",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//aut
export const auth = getAuth(app);
//db
export const db = getFirestore(app);
