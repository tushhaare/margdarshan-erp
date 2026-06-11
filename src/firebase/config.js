import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDw7p1ZXp9TN1HU58hVqqYxffCIgzZE0yQ",
  authDomain: "margdarshan-erp-2026.firebaseapp.com",
  projectId: "margdarshan-erp-2026",
  storageBucket: "margdarshan-erp-2026.firebasestorage.app",
  messagingSenderId: "488860567660",
  appId: "1:488860567660:web:b1aa2fb285525b816d7049"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);