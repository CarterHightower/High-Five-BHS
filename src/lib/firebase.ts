import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // You'll need to replace these with your actual Firebase config
  apiKey: "AIzaSyDu5uA4u6GowEEdIs81I-cBPykPl5zxeyQ",
  authDomain: "high-five-bhs.firebaseapp.com",
  projectId: "high-five-bhs",
  storageBucket: "high-five-bhs.firebasestorage.app",
  messagingSenderId: "654540739129",
  appId: "1:654540739129:web:4b8ebdd742afa2888d73e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
