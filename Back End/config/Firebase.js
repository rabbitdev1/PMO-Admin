import { getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);

  // Check if running in a browser environment
  if (typeof window !== 'undefined') {
    const { getPerformance } = require('firebase/performance');
    getPerformance(firebaseApp);
    console.log("Firebase Performance has been initialized!");
  }

  console.log("Firebase has been initialized!");
} else {
  console.log("Firebase app already initialized!");
  firebaseApp = getApps()[0];
}

const storage = getStorage(firebaseApp);
export default storage;
