import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SiteMapElement = ({ data }) => (
  <div className="cell-container">
    <article>
      <header>
        <h3>
          <Link to={`${data.url}`}>{data.title}</Link>
        </h3>
      </header>
    </article>
  </div>
);

SiteMapElement.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default SiteMapElement;
