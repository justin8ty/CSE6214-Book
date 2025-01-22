// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7HC4EVKbOrizbuNXuKY1Ho9bp2OQ7nl0",
  authDomain: "cse6214-book.firebaseapp.com",
  projectId: "cse6214-book",
  storageBucket: "cse6214-book.firebasestorage.app",
  messagingSenderId: "684243914242",
  appId: "1:684243914242:web:0e68b2fe9ae650751ca11b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)