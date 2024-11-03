import React from 'react';
import { Link } from 'react-router-dom';

import Hamburger from './Hamburger';
import routes from '../../data/routes';
import CurrentMusic from '../CurrentMusic';

// Websites Navbar, displays routes defined in 'src/data/routes'
const Navigation = () => (
  <header id="header">
    <div id="header-container">
      <h1 className="index-link">
        {routes
          .filter((l) => l.index)
          .map((l) => (
            <Link key={l.label} to={l.path}>
              {l.label}
            </Link>
          ))}
      </h1>
      <nav className="links">
        <ul>
          {routes
            .filter((l) => !l.index)
            .map((l) => (
              <li key={l.label}>
                <Link to={l.path}>{l.label}</Link>
              </li>
            ))}
        </ul>
      </nav>
    </div>

    <Hamburger />

    <div id="header-currentplaying">
      <CurrentMusic />
    </div>
  </header>
);

export default Navigation;
