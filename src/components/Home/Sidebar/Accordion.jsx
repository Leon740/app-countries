/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import FilterByCheckbox from './FilterByCheckbox';

function Accordion({
  name, options, fnSelect, fnUnSelect,
}) {
  return (
    <div className="mt-8">
      <p className="text-lg">{name}</p>
      {options.map((option, index) => <FilterByCheckbox key={index} label={option} fnSelect={fnSelect} fnUnSelect={fnUnSelect} />)}
    </div>
  );
}

Accordion.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  fnSelect: PropTypes.func,
  fnUnSelect: PropTypes.func,
};

Accordion.defaultProps = {
  name: 'name',
  options: ['filter'],
  fnSelect: () => {},
  fnUnSelect: () => {},
};

export default Accordion;
