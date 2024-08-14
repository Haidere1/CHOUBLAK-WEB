import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBUmjqrySlFdzNRPYmoRFuDxvUZ303aNJU",
    authDomain: "infinityx-ca220.firebaseapp.com",
    projectId: "infinityx-ca220",
    storageBucket: "infinityx-ca220.appspot.com",
    messagingSenderId: "355812147635",
    appId: "1:355812147635:web:033945beabd2b4e21acbc6",
    measurementId: "G-RG2ZT4754S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
