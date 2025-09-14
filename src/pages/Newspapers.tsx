// src/pages/Newspapers.tsx
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { checkAdmin } from "../services/authService";
import { addNewspaper, getNewspapers } from "../services/newsService";
import { Newspaper } from "../types";
import { fetchList } from "../services/firestoreService";

useEffect(() => {
  fetchList("newspapers").then(data => setNewspapers(data));
}, []);

function Newspapers() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [newspapers, setNewspapers] = useState<Newspaper[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        checkAdmin(user.uid).then((admin) => setIsAdmin(admin));
      } else {
        setIsAdmin(false); // ei kirjautunut
      }
      fetchList(); // hae lehdet joka tapauksessa
    });

    return () => unsubscribe(); // siivoaa listenerin kun komponentti unmounttaa
  }, []);

  // Lisää uusi lehti (vain admin)
  const handleAdd = async () => {
    if (name && description) {
      await addNewspaper({ name, description });
      setName("");
      setDescription("");
      fetchList();
    }
  };

  return (
    <div className="container">
      <h2>Sanomalehdet</h2>

      {isAdmin && (
        <div>
          <h3>Luo uusi lehti</h3>
          <input
            placeholder="Nimi"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            placeholder="Kuvaus"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <button onClick={handleAdd}>Lisää lehti</button>
        </div>
      )}

      <h3>Kaikki lehdet</h3>
      <ul>
        {newspapers.map((n) => (
          <li key={n.id}>
            <strong>{n.name}</strong>: {n.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Newspapers;
