// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-blog-recycle.firebaseapp.com",
  projectId: "my-blog-recycle",
  storageBucket: "my-blog-recycle.appspot.com",
  messagingSenderId: "219773950004",
  appId: "1:219773950004:web:82ac73c7b31008802a9261",
  measurementId: "G-2J2EDP8G5L",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need
