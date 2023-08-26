// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAM8yfkRuxGlcbp-XveXuk5oMec_0HSCb0",
  authDomain: "social-media-dashboard-3d67d.firebaseapp.com",
  projectId: "social-media-dashboard-3d67d",
  storageBucket: "social-media-dashboard-3d67d.appspot.com",
  messagingSenderId: "184076652192",
  appId: "1:184076652192:web:bfc18555889dbabfa983c5",
  measurementId: "G-K2KMS07E77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);