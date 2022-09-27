import React from 'react';
import PropTypes from 'prop-types';

function FeaturesItem({ feature, children }) {
  return (
    <li className="mb-2 text-base">
      <span className="font-semibold block">
        {feature}
        :
      </span>
      {children}
    </li>
  );
}

FeaturesItem.propTypes = {
  feature: PropTypes.string,
  children: PropTypes.node,
};

FeaturesItem.defaultProps = {
  feature: 'feature',
  children: <div>no data</div>,
};

export default FeaturesItem;
