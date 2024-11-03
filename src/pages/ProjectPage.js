import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Main from '../layouts/Main';

const ProjectPage = ((props) => {
  const location = useLocation();
  const name = 'Name';
  const description = location.pathname.split('/')[2] + JSON.stringify(props);

  return (
    <Main title={`${name}`} description={description}>
      <article className="post" id="projects">
        <header>
          <div className="title">
            <h2>
              <Link to="/projects">{name}</Link>
            </h2>
            <p>разработанные мною</p>
          </div>
        </header>
        <p>{description}</p>
      </article>
    </Main>
  );
});

export default ProjectPage;
