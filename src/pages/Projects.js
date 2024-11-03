import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

import ProjectPost from '../components/Projects/ProjectPost';
import data from '../data/projects';

const Projects = () => (
  <Main title="Проекты" description="Узнайте о проектах FazziCLAY.">
    <article className="post" id="projects">
      <header>
        <div className="title">
          <h2>
            <Link to="/projects">Проекты</Link>
          </h2>
          <p>разработанные мною</p>
        </div>
      </header>
      {data.map((project) => (
        <ProjectPost data={project} key={project.title} />
      ))}
    </article>
  </Main>
);

export default Projects;
