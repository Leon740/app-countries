import React from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';

function FilterByName({ fnOnChange }) {
  return (
    <div className="relative">
      <BsSearch className="mr-6 text-xl absolute left-6 top-4" />
      <input
        placeholder="Filter by name"
        className="text-base pr-6 pl-16 pt-4 pb-4 w-full outline-0 bg-white dark:bg-customgray-200 rounded-lg shadow-md shadow-slate-200 dark:shadow-gray-800 focus:shadow-inner focus:shadow-slate-300 dark:focus:shadow-gray-900"
        onChange={(event) => fnOnChange(event.target.value)}
      />
    </div>
  );
}

FilterByName.propTypes = {
  fnOnChange: PropTypes.func,
};

FilterByName.defaultProps = {
  fnOnChange: () => {},
};

export default FilterByName;
