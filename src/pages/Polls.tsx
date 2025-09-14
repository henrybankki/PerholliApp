// src/pages/Polls.tsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { checkAdmin } from "../services/authService";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

interface Poll {
  id?: string;
  question: string;
  options: string[];
  votes: number[];
}

function Polls() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]); // aluksi 2 vaihtoehtoa

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      checkAdmin(user.uid).then((admin) => setIsAdmin(admin));
    }
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    const snapshot = await getDocs(collection(db, "polls"));
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Poll[];
    setPolls(list);
  };

  const handleAdd = async () => {
    if (question && options.every((opt) => opt)) {
      await addDoc(collection(db, "polls"), {
        question,
        options,
        votes: options.map(() => 0),
      });
      setQuestion("");
      setOptions(["", ""]);
      fetchPolls();
    }
  };

  const handleVote = async (pollId: string, optionIndex: number) => {
    const pollRef = doc(db, "polls", pollId);
    const poll = polls.find((p) => p.id === pollId);
    if (!poll) return;
    const newVotes = [...poll.votes];
    newVotes[optionIndex]++;
    await updateDoc(pollRef, { votes: newVotes });
    fetchPolls();
  };

  return (
    <div className="container">
      <h2>Kyselyt</h2>

      {isAdmin && (
        <div>
          <h3>Luo kysely</h3>
          <input
            placeholder="Kysymys"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          {options.map((opt, idx) => (
            <input
              key={idx}
              placeholder={`Vaihtoehto ${idx + 1}`}
              value={opt}
              onChange={(e) => {
                const newOpts = [...options];
                newOpts[idx] = e.target.value;
                setOptions(newOpts);
              }}
            />
          ))}
          <button onClick={() => setOptions([...options, ""])}>
            Lisää vaihtoehto
          </button>
          <br />
          <button onClick={handleAdd}>Luo kysely</button>
        </div>
      )}

      <h3>Kaikki kyselyt</h3>
      {polls.map((poll) => (
        <div key={poll.id}>
          <strong>{poll.question}</strong>
          <ul>
            {poll.options.map((opt, idx) => (
              <li key={idx}>
                {opt} - Äänet: {poll.votes[idx]}
                <button onClick={() => handleVote(poll.id!, idx)}>
                  Äänestä
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Polls;
