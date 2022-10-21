// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCM-Y2mLiT-J-ZaP70q-LPqm35QF2vyVYM",
    authDomain: "kimmy-001.firebaseapp.com",
    projectId: "kimmy-001",
    storageBucket: "kimmy-001.appspot.com",
    messagingSenderId: "1679354533",
    appId: "1:1679354533:web:91bd684a287d1bdda1bb4c",
    measurementId: "G-8TYNCFKXE9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;