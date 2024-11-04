import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import Main from '../layouts/Main';
import { ilog } from '../Logger';

const RouterLink = (props) => (
  // eslint-disable-next-line react/prop-types
  <Link to={props.href}>{props.children}</Link>
);

function printResume() {
  ilog('printResume');
  window.print();
}

const About = () => {
  const [markdown, setMarkdown] = useState('');
  const [markdownBadges, setMarkdownBadges] = useState('');

  useEffect(() => {
    if (true) {
      import('../data/about.md').then((res) => {
        fetch(res.default)
          .then((r) => r.text())
          .then(setMarkdown);
      });

      import('../data/badges.md').then((res) => {
        fetch(res.default)
          .then((r) => r.text())
          .then(setMarkdownBadges);
      });
    }
    // } else {
    //   fetch('/about.md')
    //     .then((r) => r.text())
    //     .then(setMarkdown);
    // }
  });

  const count = markdown
    .split(/\s+/)
    .map((s) => s.replace(/\W/g, ''))
    .filter((s) => s.length).length;

  return (
    <Main title="Обо мне" description="О FazziCLAY'е">
      <article className="post markdown" id="about">
        <header>
          <div className="title">
            <h2>
              <Link to="/about">Обо мне</Link>
            </h2>
            <Markdown renderers={{ Link: RouterLink }}>{markdownBadges}</Markdown>
          </div>
        </header>
        <Markdown className="data-print" data-print renderers={{ Link: RouterLink }}>{markdown}</Markdown>
      </article>
    </Main>
  );
};

export default About;
