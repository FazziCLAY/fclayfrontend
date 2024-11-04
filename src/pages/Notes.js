import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

import routes from '../data/routes';

const Notes = () => (
  <div>
    {routes
      .filter((l) => !l.index)
      .map((l) => (
        <Link key={l.label} to={l.path}>
          {l.label}
        </Link>
      ))}
    <span>uwu</span>
    <h1>Заметки</h1>
    <h2>{Date.now().toString()}</h2>
  </div>
);

export default Notes;
