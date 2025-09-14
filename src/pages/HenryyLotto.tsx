// src/pages/HenryyLotto.tsx
import React, { useState } from "react";

function HenryyLotto() {
  const [selected, setSelected] = useState<number[]>([]);
  const [result, setResult] = useState<number[]>([]);

  const handleClick = (num: number) => {
    if (selected.includes(num)) {
      setSelected(selected.filter((n) => n !== num));
    } else if (selected.length < 7) {
      setSelected([...selected, num]);
    }
  };

  const draw = () => {
    const nums: number[] = [];
    while (nums.length < 7) {
      const n = Math.floor(Math.random() * 21); // 0-20
      if (!nums.includes(n)) nums.push(n);
    }
    setResult(nums);
  };

  return (
    <div className="container">
      <h2>HenryyLotto</h2>
      <p>Valitse 7 numeroa (0-20):</p>
      <div>
        {Array.from({ length: 21 }, (_, i) => i).map((n) => (
          <button
            key={n}
            onClick={() => handleClick(n)}
            style={{
              margin: "2px",
              backgroundColor: selected.includes(n) ? "#104e8b" : "#1e90ff",
            }}
          >
            {n}
          </button>
        ))}
      </div>
      <p>Valitut numerot: {selected.join(", ")}</p>
      <button onClick={draw}>Arvo numerot</button>
      <p>Arvotut numerot: {result.join(", ")}</p>
    </div>
  );
}

export default HenryyLotto;
