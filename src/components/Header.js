import React from 'react';
import { Link } from 'react-router-dom';  // Importer Link pour la navigation

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/page">Page</Link></li>
          <li><Link to="/about">About</Link></li>
          </ul>
      </nav>
    </header>
  );
}

export default Header;
