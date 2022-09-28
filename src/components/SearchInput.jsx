import React from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';

function SearchInput({ value, onChange }) {
  return (
    <div className="relative">
      <BsSearch className="mr-6 text-xl absolute left-6 top-4" />
      <input
        placeholder="Search for country"
        className="text-base pr-6 pl-16 pt-4 pb-4 w-full outline-0 bg-white dark:bg-customgray-200 rounded-lg shadow-md shadow-slate-200 dark:shadow-gray-800 focus:shadow-lg focus:shadow-slate-300 dark:focus:shadow-gray-900 transition ease-in-out duration-300"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

SearchInput.defaultProps = {
  value: '',
  onChange: () => {},
};

export default SearchInput;
