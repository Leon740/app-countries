/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

function FilterByCheckbox({ label, fnSelect, fnUnSelect }) {
  function fnOnChange(isChecked, value) {
    // eslint-disable-next-line no-unused-expressions
    isChecked ? fnSelect(value) : fnUnSelect(value);
  }

  return (
    <div className="text-base mt-4">
      <label>
        <input type="checkbox" value={label} onChange={(event) => fnOnChange(event.target.checked, event.target.value)} />
        <span className="ml-2">{label}</span>
      </label>
    </div>
  );
}

FilterByCheckbox.propTypes = {
  label: PropTypes.string,
  fnSelect: PropTypes.func,
  fnUnSelect: PropTypes.func,
};

FilterByCheckbox.defaultProps = {
  label: 'label',
  fnSelect: () => {},
  fnUnSelect: () => {},
};

export default FilterByCheckbox;
