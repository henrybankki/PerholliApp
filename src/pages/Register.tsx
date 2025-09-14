// src/pages/Register.tsx
import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Rekisteröinti onnistui!");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h2>Rekisteröidy</h2>
      <input
        placeholder="Sähköposti"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        placeholder="Salasana"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Rekisteröidy</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Register;
