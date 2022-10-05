import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { BsSearch } from 'react-icons/bs';

function SearchControls({ fnInputOnChange, fnSelectOnChange }) {
  const [stInputValue, setStInputValue] = useState('');

  function funcInputOnChange(value) {
    setStInputValue(value);
    fnInputOnChange(value);
  }

  function funcSelectOnChange(value) {
    fnSelectOnChange(value);
    funcInputOnChange('');
  }

  const SELECT_OPTIONS = [
    { value: 'all', label: 'All' },
    { value: 'americas', label: 'Americas' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia', label: 'Asia' },
    { value: 'africa', label: 'Africa' },
    { value: 'oceania', label: 'Oceania' },
  ];

  return (
    <div className="mt-16 mb-16 -ml-8 -mr-8 flex flex-col sm:flex-row justify-between">
      <div className="pl-8 pr-8 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12">
        <div className="relative">
          <BsSearch className="mr-6 text-xl absolute left-6 top-4" />
          <input
            placeholder="Search by name"
            className="text-base pr-6 pl-16 pt-4 pb-4 w-full outline-0 bg-white dark:bg-customgray-200 rounded-lg shadow-md shadow-slate-200 dark:shadow-gray-800 focus:shadow-inner focus:shadow-slate-300 dark:focus:shadow-gray-900"
            value={stInputValue}
            onChange={(event) => funcInputOnChange(event.target.value)}
          />
        </div>
      </div>

      <div className="pl-8 pr-8 mt-8 sm:mt-0 sm:w-4/12 lg:w-3/12 2xl:w-2/12">
        <Select placeholder="Region" classNamePrefix="select" options={SELECT_OPTIONS} onChange={(option) => funcSelectOnChange(option.value)} />
      </div>
    </div>
  );
}

SearchControls.propTypes = {
  fnInputOnChange: PropTypes.func,
  fnSelectOnChange: PropTypes.func,
};

SearchControls.defaultProps = {
  fnInputOnChange: () => {},
  fnSelectOnChange: () => {},
};

export default SearchControls;
