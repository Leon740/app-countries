import React from 'react';
import PropTypes from 'prop-types';
import FILTERS from './filters.json';
import FilterByName from './FilterByName';
import Accordion from './Accordion';

function Sidebar({
  active, nameValue, fnNameOnChange, fnRegionAdd, fnRegionRemove, fnLanguageAdd, fnLanguageRemove,
}) {
  return (
    <div className={`h-screen min-h-max fixed xl:sticky top-0 xl:top-20 pt-20 xl:pt-0 xl:pb-20 w-64 xl:w-full -left-64 ${active ? 'left-0' : ''} xl:left-0 transition-all duration-300 bg-white dark:bg-customgray-200 shadow-md shadow-slate-200 dark:shadow-gray-800`}>
      <div className="p-8 h-full overflow-y-auto">
        <FilterByName value={nameValue} fnOnChange={fnNameOnChange} />
        <Accordion name="Regions" options={FILTERS.regions} fnSelect={fnRegionAdd} fnUnSelect={fnRegionRemove} />
        <Accordion name="Languages" options={FILTERS.languages} fnSelect={fnLanguageAdd} fnUnSelect={fnLanguageRemove} />
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  active: PropTypes.bool,
  nameValue: PropTypes.string,
  fnNameOnChange: PropTypes.func,
  fnRegionAdd: PropTypes.func,
  fnRegionRemove: PropTypes.func,
  fnLanguageAdd: PropTypes.func,
  fnLanguageRemove: PropTypes.func,
};

Sidebar.defaultProps = {
  active: false,
  nameValue: '',
  fnNameOnChange: () => {},
  fnRegionAdd: () => {},
  fnRegionRemove: () => {},
  fnLanguageAdd: () => {},
  fnLanguageRemove: () => {},
};

export default Sidebar;
