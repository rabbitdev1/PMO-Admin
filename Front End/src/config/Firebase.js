import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/performance';

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

// Initialize Firebase Storage
const storage = firebase.storage();

// Initialize Firebase Performance Monitoring if in a browser environment
let performance;
if (typeof window !== 'undefined') {
    performance = firebase.performance();
    console.log("Firebase Performance has been initialized!");
}

export { storage, performance };
