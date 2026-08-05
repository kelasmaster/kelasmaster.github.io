// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu8Dj0gd84MUQyN86189c2S_4xYUXJ5MI",
  authDomain: "bandar-finance.firebaseapp.com",
  projectId: "bandar-finance",
  storageBucket: "bandar-finance.firebasestorage.app",
  messagingSenderId: "914920751325",
  appId: "1:914920751325:web:d53e197a2a87a4fd95db34",
  measurementId: "G-TZWXSKMWL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
