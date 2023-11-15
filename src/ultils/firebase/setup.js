// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChwo308FKLz8LZG5WE2m21Xfuq2HfsR-M",
  authDomain: "parkinght-2911f.firebaseapp.com",
  projectId: "parkinght-2911f",
  storageBucket: "parkinght-2911f.appspot.com",
  messagingSenderId: "864583364726",
  appId: "1:864583364726:web:fde6b8a81e25a9cea26f57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app) 