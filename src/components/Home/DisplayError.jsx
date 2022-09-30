import React from 'react';
import PropTypes from 'prop-types';

function DisplayError({ message }) {
  return (
    <div className="text-lg text-red-600 p-4 bg-red-200 border-2 border-red-600 rounded-md">
      {message}
    </div>
  );
}

DisplayError.propTypes = {
  message: PropTypes.string,
};

DisplayError.defaultProps = {
  message: 'Error',
};

export default DisplayError;
