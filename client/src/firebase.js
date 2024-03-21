// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "recipe-xplorer-973b0.firebaseapp.com",
  projectId: "recipe-xplorer-973b0",
  storageBucket: "recipe-xplorer-973b0.appspot.com",
  messagingSenderId: "722503909113",
  appId: "1:722503909113:web:a6d44cfe16ae358e19ec28"
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
export const app = initializeApp(firebaseConfig);