// src/components/NavBar.tsx
import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav>
      <Link to="/">Sanomalehdet</Link>
      <Link to="/articles">Artikkelit</Link>
      <Link to="/polls">Kyselyt</Link>
      <Link to="/lotto">HenryyLotto</Link>
      <Link to="/original">HenryyOriginal</Link>
      <Link to="/login">Kirjaudu</Link>
    </nav>
  );
};

export default NavBar;
