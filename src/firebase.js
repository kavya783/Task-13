
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAW8n4yStT6wByRYqNDGwI9r1dhK06jYKE",
  authDomain: "admin-e-commerce-crud-project.firebaseapp.com",
  projectId: "admin-e-commerce-crud-project",
  storageBucket: "admin-e-commerce-crud-project.firebasestorage.app",
  messagingSenderId: "889506238741",
  appId: "1:889506238741:web:e679c1140fbf894bd1d91c",
  measurementId: "G-1YB92DVXCF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);