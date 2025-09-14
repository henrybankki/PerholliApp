// src/pages/HenryyOriginal.tsx
import React, { useState } from "react";

function HenryyOriginal() {
  const [result, setResult] = useState<number[]>([]);

  const draw = () => {
    const nums: number[] = [];
    while (nums.length < 7) {
      const n = Math.floor(Math.random() * 21);
      if (!nums.includes(n)) nums.push(n);
    }
    setResult(nums);
  };

  return (
    <div className="container">
      <h2>HenryyOriginal</h2>
      <button onClick={draw}>Arvo numerot</button>
      <p>Arvotut numerot: {result.join(", ")}</p>
    </div>
  );
}

export default HenryyOriginal;
