// src/pages/Admin.tsx
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";

const Admin: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [articles, setArticles] = useState<string>("");
  const [lottoSubmissions, setLottoSubmissions] = useState<any[]>([]);
  const [originalSubmissions, setOriginalSubmissions] = useState<any[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  // Hae kaikki käyttäjät
  useEffect(() => {
    const fetchUsers = async () => {
      const snap = await getDocs(collection(db, "users"));
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    const fetchSubmissions = async () => {
      const lottoSnap = await getDocs(collection(db, "admin_lotto_submissions"));
      const originalSnap = await getDocs(collection(db, "admin_original_submissions"));
      setLottoSubmissions(lottoSnap.docs.map(d => d.data()));
      setOriginalSubmissions(originalSnap.docs.map(d => d.data()));
    };

    fetchUsers();
    fetchSubmissions();
  }, []);

  // Lisää saldoa käyttäjälle
  const addBalance = async () => {
    if (!selectedUser) return alert("Valitse käyttäjä");
    const userRef = doc(db, "users", selectedUser);
    const userSnap = await getDocs(collection(db, "users"));
    const userData = users.find(u => u.id === selectedUser);
    await updateDoc(userRef, { balance: (userData.balance || 0) + amount });
    alert("Saldo lisätty!");
  };

  // Lisää artikkeli
  const createArticle = async () => {
    await addDoc(collection(db, "articles"), {
      content: articles,
      timestamp: serverTimestamp()
    });
    setArticles("");
    alert("Artikkeli lisätty!");
  };

  // Lataa PDF
  const uploadPdf = async () => {
    if (!pdfFile) return;
    // Jos käytät Firestore Storagea
    alert("PDF-tiedoston lataus toteutettava Storageen");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin-paneeli</h2>

      <section>
        <h3>Lisää saldoa käyttäjälle</h3>
        <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
          <option value="">Valitse käyttäjä</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.email}</option>)}
        </select>
        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        <button onClick={addBalance}>Lisää saldoa</button>
      </section>

      <section>
        <h3>Luo artikkeli</h3>
        <textarea value={articles} onChange={(e) => setArticles(e.target.value)} rows={5} cols={50} />
        <button onClick={createArticle}>Lisää artikkeli</button>
      </section>

      <section>
        <h3>Lataa lehti (PDF)</h3>
        <input type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} />
        <button onClick={uploadPdf}>Lataa PDF</button>
      </section>

      <section>
        <h3>HenryyLotto osallistumiset</h3>
        <table border={1}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Numerot</th>
              <th>Aikaleima</th>
            </tr>
          </thead>
          <tbody>
            {lottoSubmissions.map((s, idx) => (
              <tr key={idx}>
                <td>{s.email}</td>
                <td>{s.numbers.join(", ")}</td>
                <td>{s.timestamp?.toDate().toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3>HenryyOriginal osallistumiset</h3>
        <table border={1}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Numerot</th>
              <th>Aikaleima</th>
            </tr>
          </thead>
          <tbody>
            {originalSubmissions.map((s, idx) => (
              <tr key={idx}>
                <td>{s.email}</td>
                <td>{s.numbers.join(", ")}</td>
                <td>{s.timestamp?.toDate().toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Admin;
