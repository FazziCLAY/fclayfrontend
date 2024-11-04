import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import dayjs from 'dayjs';
import Markdown from 'markdown-to-jsx';
import Main from '../layouts/Main';
import data from '../data/projects';
import NotFound from './NotFound';
import { ilog } from '../Logger';
import { isSet } from '../FazziCLAY';

const ProjectPage = ((props) => {
  const [markdown, setMarkdown] = useState('');

  const location = useLocation();
  const urlName = location.pathname.split('/')[2];

  const project = data.filter((l) => l.urlName === urlName)[0];
  if (!project) {
    return (
      <>
        <NotFound />
      </>
    );
  }

  if (isSet(project?.markdownUrl)) {
    useEffect(() => {
      try {
        fetch(project.markdownUrl)
          .then((r) => r.text())
          .then(setMarkdown);
      } catch (e) {
        ilog(`${e}`);
      }
    }, []);
  }

  const sourceJsx = project.sourceCode ? (
    <>
      <a href={project.sourceCode}>
        <img
          alt="GitHub"
          src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"
        />
      </a>
    </>
  ) : null;

  return (
    <Main title={`${project.title}`} description={project.subtitle}>
      <article className="post" id="projects">
        <header>
          <div className="title">
            <h2>
              <Link to={`/project/${project.urlName}`}>{project.title}</Link>
            </h2>
            {sourceJsx}
            <p>{project.subtitle}</p>
            <p className="published">
              {dayjs(project.date)
                .format('MMMM, YYYY')}
            </p>
          </div>
        </header>
        <Markdown>{markdown}</Markdown>
      </article>
    </Main>
  );
});

export default ProjectPage;
