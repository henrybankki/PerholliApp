// src/pages/HenryyLotto.tsx
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc } from "firebase/firestore";

const HenryyLotto = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  const toggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
    } else if (selectedNumbers.length < 7) {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };

  const sendToAdmin = async () => {
    if (!auth.currentUser) return;

    const userRef = doc(db, "users", auth.currentUser.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) return alert("Käyttäjää ei löydy");

    const balance = userSnap.data().balance;
    if (balance < 1) return alert("Ei tarpeeksi saldoa!");

    // Vähennä 1 €
    await updateDoc(userRef, { balance: balance - 1 });

    // Lähetä numerot adminille
    await addDoc(collection(db, "admin_lotto_submissions"), {
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
      numbers: selectedNumbers,
      timestamp: serverTimestamp()
    });

    alert("Numerot lähetetty adminille ja 1€ veloitettu!");
    setSelectedNumbers([]);
  };

  return (
    <div>
      <h2>HenryyLotto</h2>
      <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "300px" }}>
        {[...Array(20).keys()].map(n => (
          <button
            key={n}
            onClick={() => toggleNumber(n)}
            style={{
              width: "40px",
              height: "40px",
              margin: "2px",
              backgroundColor: selectedNumbers.includes(n) ? "green" : "lightgray"
            }}
          >
            {n}
          </button>
        ))}
      </div>
      <div style={{ marginTop: "1rem" }}>
        <p>Valitut numerot: {selectedNumbers.join(", ")}</p>
        <button onClick={sendToAdmin}>Maksa 1€ & Lähetä</button>
      </div>
    </div>
  );
};

export default HenryyLotto;
