import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

import SiteMapElement from '../components/SiteMapElement';
import data from '../data/sitemap';

const Projects = () => (
  <Main title="Карта сайта" description="index">
    <article>
      <header>
        <div className="title">
          <h2>Карта сайта / Site map</h2>
        </div>
      </header>
      {data.map((project) => (
        <SiteMapElement data={project} key={project.title} />
      ))}
    </article>
  </Main>
);

export default Projects;
