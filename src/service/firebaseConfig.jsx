// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaV15N_jQja_sGeBelt7Sawt33dMajrOg", // Replace with your Firebase API key
  authDomain: "ai-trip-planner-43dcd.firebaseapp.com", // Replace with your Firebase Auth domain
  projectId: "ai-trip-planner-43dcd", // Replace with your Firebase project ID
  storageBucket: "ai-trip-planner-43dcd.appspot.com", // Replace with your Firebase storage bucket
  messagingSenderId: "563456730780", // Replace with your Firebase messaging sender ID
  appId: "1:563456730780:web:4cf38384faaf0d475eef59", // Replace with your Firebase app ID
  measurementId: "G-FGHP0H8C30" // Replace with your Firebase measurement ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
