// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLVHbCTOPxcCLEAXSAaivJzJHOEmc1pzo",
  authDomain: "ecommerce-project-aeafc.firebaseapp.com",
  projectId: "ecommerce-project-aeafc",
  storageBucket: "ecommerce-project-aeafc.appspot.com",
  messagingSenderId: "210435368467",
  appId: "1:210435368467:web:8ce6ff24142387c20a01e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db =  getFirestore(app);