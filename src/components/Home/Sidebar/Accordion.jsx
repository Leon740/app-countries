/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import FilterByCheckbox from './FilterByCheckbox';

function Accordion({ name, options, fnCheckboxOnChange }) {
  return (
    <div className="mt-8">
      <p className="text-lg">{name}</p>
      {options.map((option, index) => <FilterByCheckbox key={index} name={name} label={option} fnOnChange={fnCheckboxOnChange} />)}
    </div>
  );
}

Accordion.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  fnCheckboxOnChange: PropTypes.func,
};

Accordion.defaultProps = {
  name: 'name',
  options: ['filter'],
  fnCheckboxOnChange: () => {},
};

export default Accordion;
