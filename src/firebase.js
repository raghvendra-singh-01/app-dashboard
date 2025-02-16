// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvhipkJo-v14020kUbNUFDuZBUqI1yHdY",
  authDomain: "project-x-0-1.firebaseapp.com",
  projectId: "project-x-0-1",
  storageBucket: "project-x-0-1.firebasestorage.app",
  messagingSenderId: "350409795141",
  appId: "1:350409795141:web:758c20177e100d0ac9652c",
  measurementId: "G-08WTKQZ693"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth };