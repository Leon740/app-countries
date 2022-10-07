/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import FILTERS from './filters.json';
import FilterByName from './FilterByName';
import Accordion from './Accordion';

function Sidebar({
  nameValue, fnNameOnChange, fnRegionAdd, fnRegionRemove,
}) {
  return (
    <div className="h-full min-h-screen p-8 bg-white dark:bg-customgray-200 shadow-md shadow-slate-200 dark:shadow-gray-800">
      <FilterByName value={nameValue} fnOnChange={fnNameOnChange} />
      {FILTERS.map((filter, index) => <Accordion key={index} name={filter.name} options={filter.options} fnSelect={fnRegionAdd} fnUnSelect={fnRegionRemove} />)}
    </div>
  );
}

Sidebar.propTypes = {
  nameValue: PropTypes.string,
  fnNameOnChange: PropTypes.func,
  fnRegionAdd: PropTypes.func,
  fnRegionRemove: PropTypes.func,
};

Sidebar.defaultProps = {
  nameValue: '',
  fnNameOnChange: () => {},
  fnRegionAdd: () => {},
  fnRegionRemove: () => {},
};

export default Sidebar;
