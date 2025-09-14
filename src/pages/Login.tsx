// src/pages/Login.tsx
import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password); // kirjautuminen
      alert("Kirjautuminen onnistui!");
    } catch (err) {
      alert("Virhe: " + err);
    }
  };

  return (
    <div className="container">
      <h2>Kirjaudu</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Sähköposti"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Salasana"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Kirjaudu</button>
      </form>
    </div>
  );
}

export default Login;
