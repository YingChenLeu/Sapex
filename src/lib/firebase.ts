// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCpRSUJUHye-6kX9Dd6HOlJnO-IMTA1OYw",
  authDomain: "sapex-a05d5.firebaseapp.com",
  projectId: "sapex-a05d5",
  storageBucket: "sapex-a05d5.firebasestorage.app",
  messagingSenderId: "674495649117",
  appId: "1:674495649117:web:755b7877427abc6b3b84b4",
  measurementId: "G-BY6R3V5299"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export { app };
export { auth, provider };