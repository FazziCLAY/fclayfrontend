import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const ProjectPost = ({ data }) => (
  <div className="cell-container">
    <article className="mini-post">
      <header>
        <h3>
          <a href={`/project/${data.urlName}`}>{data.title}</a>
        </h3>
        <p>{data.subtitle}</p>
        <time className="published">
          {dayjs(data.date).format('MMMM, YYYY')}
        </time>
      </header>
    </article>
  </div>
);

ProjectPost.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    urlName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProjectPost;
