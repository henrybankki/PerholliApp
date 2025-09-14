// src/components/Balance.tsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const Balance: React.FC = () => {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!auth.currentUser) return;

    const userRef = doc(db, "users", auth.currentUser.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setBalance(docSnap.data().balance);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!auth.currentUser) return null;

  return (
    <div style={{ position: "fixed", top: 0, right: 0, padding: "1rem", background: "#eee" }}>
      Saldo: {balance !== null ? `${balance} €` : "Ladataan..."}
    </div>
  );
};

export default Balance;
