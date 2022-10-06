/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

function FilterByCheckbox({ name, label, fnOnChange }) {
  return (
    <div className="text-base mt-4">
      <label>
        <input name={name} type="radio" onChange={(event) => fnOnChange(event.target.checked ? label : '')} />
        <span className="ml-2">{label}</span>
      </label>
    </div>
  );
}

FilterByCheckbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  fnOnChange: PropTypes.func,
};

FilterByCheckbox.defaultProps = {
  name: 'name',
  label: 'label',
  fnOnChange: () => {},
};

export default FilterByCheckbox;
