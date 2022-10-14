/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

function FilterByCheckbox({
  label, qty, fnSelect, fnUnSelect,
}) {
  return (
    <div className="text-base mt-4">
      <label>
        <input type="checkbox" value={label} onChange={({ target: { checked, value } }) => (checked ? fnSelect(value) : fnUnSelect(value))} />
        <span className="ml-2">{label}</span>
        <span className="ml-2 text-sm">
          (
          {qty}
          )
        </span>
      </label>
    </div>
  );
}

FilterByCheckbox.propTypes = {
  label: PropTypes.string,
  qty: PropTypes.number,
  fnSelect: PropTypes.func,
  fnUnSelect: PropTypes.func,
};

FilterByCheckbox.defaultProps = {
  label: 'label',
  qty: 0,
  fnSelect: () => {},
  fnUnSelect: () => {},
};

export default FilterByCheckbox;
