// src/pages/HenryyOriginal.tsx
import React from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";

const HenryyOriginal = () => {
  const playGame = async () => {
    if (!auth.currentUser) return;

    const userRef = doc(db, "users", auth.currentUser.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) return alert("Käyttäjää ei löydy");

    const balance = userSnap.data().balance;
    if (balance < 1) return alert("Ei tarpeeksi saldoa!");

    // Vähennä 1 €
    await updateDoc(userRef, { balance: balance - 1 });

    // Arvo numerot
    const numbers = Array.from({ length: 7 }, () => Math.floor(Math.random() * 20));

    // Lähetä adminille
    await addDoc(collection(db, "admin_original_submissions"), {
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
      numbers,
      timestamp: serverTimestamp()
    });

    alert("Numerot arvottu ja 1€ veloitettu adminille!");
  };

  return (
    <div>
      <h2>HenryyOriginal</h2>
      <button onClick={playGame}>Arvo numerot & Maksa 1€</button>
    </div>
  );
};

export default HenryyOriginal;
