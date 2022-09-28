import React from 'react';
import PropTypes from 'prop-types';

function Feature({ name, children }) {
  return (
    <li className="mb-2 text-sm">
      <span className="font-semibold">
        {name}
        :
      </span>
      {' '}
      <span>
        {children}
      </span>
    </li>
  );
}

Feature.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
};

Feature.defaultProps = {
  name: 'feature',
  children: 'no data',
};

export default Feature;
