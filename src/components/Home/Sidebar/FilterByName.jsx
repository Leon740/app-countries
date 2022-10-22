/* eslint-disable import/order */
import React, { useContext } from 'react';
import AppContext from '../AppContext';
import { BsSearch } from 'react-icons/bs';

function FilterByName() {
  const { nameValue, fnNameOnChange } = useContext(AppContext);

  return (
    <div className="relative">
      <BsSearch className="mr-6 text-xl absolute left-6 top-4" />
      <input
        value={nameValue}
        placeholder="Name"
        className="text-base pr-6 pl-16 pt-4 pb-4 w-full outline-0 bg-white dark:bg-customgray-200 rounded-lg shadow-md shadow-slate-200 dark:shadow-gray-800 focus:shadow-inner focus:shadow-slate-300 dark:focus:shadow-gray-900"
        onChange={({ target: { value } }) => fnNameOnChange(value)}
      />
    </div>
  );
}

export default FilterByName;
