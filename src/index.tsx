// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client"; // React 18
import App from "./App";
import "./index.css";

// Haetaan root-elementti HTML:stä
const rootElement = document.getElementById("root");

if (rootElement) {
  // Luodaan root React 18 API:lla
  const root = ReactDOM.createRoot(rootElement);

  // Renderöidään App komponentti StrictModessa
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root-elementtiä ei löytynyt index.html:stä");
}
