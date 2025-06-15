// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgDeU7tcvzQRodygUEHGQIr7y3_UuQHto",
  authDomain: "dsa-progress-tracker-86e61.firebaseapp.com",
  projectId: "dsa-progress-tracker-86e61",
  storageBucket: "dsa-progress-tracker-86e61.appspot.com",
  messagingSenderId: "10430223014",
  appId: "1:10430223014:web:07b55cab9b5cccc3151a67",
  measurementId: "G-55LVVP8Z41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);