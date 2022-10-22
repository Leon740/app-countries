import React, { useContext, memo } from 'react';
import AppContext from '../AppContext';
import fnSanitize from '../../../utils/fnSanitize';
import FilterByName from './FilterByName';
import Accordion from './Accordion';

function Sidebar() {
  const {
    countries, sidebar, fnRegionAdd, fnRegionRemove, fnLanguageAdd, fnLanguageRemove, fnTimezoneAdd, fnTimezoneRemove,
  } = useContext(AppContext);

  const regions = Array.from(new Set(countries.map((country) => country.region)));
  const languages = ['English', 'Russian', 'Ukrainian', 'Spanish'];
  const timezones = ['UTC-04:00', 'UTC+14:00', 'UTC+12:00'];

  function fnGetOptionsByArray(array, key) {
    return array.map((label) => ({
      label,
      qty: countries.filter((country) => fnSanitize(country[key]).includes(fnSanitize(label))).length,
    }));
  }

  const optionsRegions = fnGetOptionsByArray(regions, 'region');
  const optionsLanguages = fnGetOptionsByArray(languages, 'languages');
  const optionsTimezones = fnGetOptionsByArray(timezones, 'timezones');

  return (
    <div
      className={`
        fixed z-20 w-64 top-20  ${sidebar ? 'left-0' : '-left-64'}
        xl:sticky xl:w-full
        p-8 bg-white dark:bg-customgray-200 shadow-md shadow-slate-200 dark:shadow-gray-800  duration-300`}
      style={{ height: 'calc(100vh - 5rem)', transitionProperty: 'left' }}
    >
      <div className="h-full overflow-y-auto">
        <FilterByName />
        <Accordion name="Regions" options={optionsRegions} fnSelect={fnRegionAdd} fnUnSelect={fnRegionRemove} />
        <Accordion name="Languages" options={optionsLanguages} fnSelect={fnLanguageAdd} fnUnSelect={fnLanguageRemove} />
        <Accordion name="Timezones" options={optionsTimezones} fnSelect={fnTimezoneAdd} fnUnSelect={fnTimezoneRemove} />
      </div>
    </div>
  );
}

export default memo(Sidebar);
