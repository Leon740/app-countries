import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import SearchInput from './SearchInput';

function SearchControls({ fnInputOnChange, fnSelectOnChange }) {
  const REGION_SELECT_OPTIONS = [
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
        <SearchInput fnOnChange={fnInputOnChange} />
      </div>

      <div className="pl-8 pr-8 mt-8 sm:mt-0 sm:w-4/12 lg:w-3/12 2xl:w-2/12">
        <Select placeholder="Region" classNamePrefix="select" options={REGION_SELECT_OPTIONS} value={{ value: 'all', label: 'All' }} onChange={(option) => fnSelectOnChange(option.value)} />
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
