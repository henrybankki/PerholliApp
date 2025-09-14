// src/pages/Articles.tsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { checkAdmin } from "../services/authService";
import { collection, addDoc, getDocs } from "firebase/firestore";

interface Article {
  id?: string;
  title: string;
  content: string;
}

function Articles() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      checkAdmin(user.uid).then((admin) => setIsAdmin(admin));
    }
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const snapshot = await getDocs(collection(db, "articles"));
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Article[];
    setArticles(list);
  };

  const handleAdd = async () => {
    if (title && content) {
      await addDoc(collection(db, "articles"), { title, content });
      setTitle("");
      setContent("");
      fetchArticles();
    }
  };

  return (
    <div className="container">
      <h2>Artikkelit</h2>

      {isAdmin && (
        <div>
          <h3>Luo uusi artikkeli</h3>
          <input
            placeholder="Otsikko"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <textarea
            placeholder="Sisältö"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <br />
          <button onClick={handleAdd}>Lisää artikkeli</button>
        </div>
      )}

      <h3>Kaikki artikkelit</h3>
      <ul>
        {articles.map((a) => (
          <li key={a.id}>
            <strong>{a.title}</strong>: {a.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Articles;
