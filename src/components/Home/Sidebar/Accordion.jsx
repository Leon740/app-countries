/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import FilterByCheckbox from './FilterByCheckbox';

function Accordion({
  name, options, fnSelect, fnUnSelect,
}) {
  return (
    <section className="mt-8">
      <h2 className="text-lg">{name}</h2>
      {options.map((option, index) => <FilterByCheckbox key={index} label={option.label} qty={option.qty} fnSelect={fnSelect} fnUnSelect={fnUnSelect} />)}
    </section>
  );
}

Accordion.propTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      qty: PropTypes.number,
    }),
  ),
  fnSelect: PropTypes.func,
  fnUnSelect: PropTypes.func,
};

Accordion.defaultProps = {
  name: 'name',
  options: [{
    label: 'label',
    qty: 0,
  }],
  fnSelect: () => {},
  fnUnSelect: () => {},
};

export default Accordion;
