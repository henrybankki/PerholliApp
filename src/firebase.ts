// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBo-xD1PE8lHUXZ7ygn8Jn_TkdFZ_w1fqM",
  authDomain: "outilehti-10cb9.firebaseapp.com",
  projectId: "outilehti-10cb9",
  storageBucket: "outilehti-10cb9.firebasestorage.app",
  messagingSenderId: "962840932485",
  appId: "1:962840932485:web:0def637d1e80006176b9ec"

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // <--- TÄRKEÄ

export default app;
