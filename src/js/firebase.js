// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "chatapi-2afc2.firebaseapp.com",
  databaseURL: "https://chatapi-2afc2-default-rtdb.firebaseio.com",
  projectId: "chatapi-2afc2",
  storageBucket: "chatapi-2afc2.firebasestorage.app",
  messagingSenderId: "1076406940514",
  appId: "1:1076406940514:web:a84d3daf99fe4225aa723b"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)