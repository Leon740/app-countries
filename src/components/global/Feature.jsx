import React from 'react';
import PropTypes from 'prop-types';

function Feature({ name, children }) {
  return (
    <li className="text-base mb-4">
      <div className="font-semibold mb-2">
        {name}
        :
      </div>
      <div>{children}</div>
    </li>
  );
}

Feature.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
};

Feature.defaultProps = {
  name: 'name',
  children: 'content',
};

export default Feature;
