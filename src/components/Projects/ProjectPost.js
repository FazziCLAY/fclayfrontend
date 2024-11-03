import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const ProjectPost = ({ data }) => (
  <div className="cell-container">
    <article className="mini-post">
      <header>
        <h3>
          <a href={data.link}>{data.title}</a>
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
    link: PropTypes.string,
    image: PropTypes.string,
    date: PropTypes.string.isRequired,
    urlName: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProjectPost;
