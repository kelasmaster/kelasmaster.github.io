// Import SDK Firebase v10+ (ES Modules)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAu8Dj0gd84MUQyN86189c2S_4xYUXJ5MI",
  authDomain: "bandar-finance.firebaseapp.com",
  projectId: "bandar-finance",
  storageBucket: "bandar-finance.firebasestorage.app",
  messagingSenderId: "914920751325",
  appId: "1:914920751325:web:d53e197a2a87a4fd95db34",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
