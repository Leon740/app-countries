import React from 'react';
import PropTypes from 'prop-types';

function Container({ as, className, children }) {
  const Tag = as;

  return (
    <Tag className={`container mx-auto pl-8 pr-8 ${className}`}>{children}</Tag>
  );
}

Container.propTypes = {
  as: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

Container.defaultProps = {
  as: 'div',
  className: '',
  children: '',
};

export default Container;
