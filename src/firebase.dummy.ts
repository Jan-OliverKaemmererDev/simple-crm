// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// DUMMY FILE - Do not store real API keys here
export const firebaseConfig = {
  apiKey: "DUMMY_API_KEY",
  authDomain: "DUMMY_AUTH_DOMAIN",
  projectId: "DUMMY_PROJECT_ID",
  storageBucket: "DUMMY_STORAGE_BUCKET",
  messagingSenderId: "DUMMY_MESSAGING_SENDER_ID",
  appId: "DUMMY_APP_ID",
  measurementId: "DUMMY_MEASUREMENT_ID"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
