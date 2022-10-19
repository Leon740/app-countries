import React, { useContext } from 'react';
import AppContext from '../AppContext';
import fnSanitize from '../../../utils/fnSanitize';
import FilterByName from './FilterByName';
import Accordion from './Accordion';

function Sidebar() {
  const {
    countries, stSidebar, fnRegionAdd, fnRegionRemove, fnLanguageAdd, fnLanguageRemove,
  } = useContext(AppContext);

  // regions
  const regions = Array.from(new Set(countries.map((country) => country.region)));

  function getCountriesQtyByRegion(region = 'Europe') {
    return countries.filter((country) => fnSanitize(country.region).includes(fnSanitize(region))).length;
  }

  const optionsRegions = regions.map((region) => ({
    label: region,
    qty: getCountriesQtyByRegion(region),
  }));

  // languages
  const languages = ['English', 'Russian', 'Ukrainian', 'Spanish'];

  function getCountriesQtyByLanguage(language = 'English') {
    return countries.filter((country) => fnSanitize(country.languages).includes(fnSanitize(language))).length;
  }

  const optionsLanguages = languages.map((language) => ({
    label: language,
    qty: getCountriesQtyByLanguage(language),
  }));

  return (
    <div
      className={`
      fixed w-64 top-20  ${stSidebar ? 'left-0' : '-left-64'}
      xl:sticky xl:w-full
      p-8 bg-white dark:bg-customgray-200 shadow-md shadow-slate-200 dark:shadow-gray-800 transition-all duration-300`}
      style={{ height: 'calc(100vh - 5rem)' }}
    >
      <div className="h-full overflow-y-auto">
        <FilterByName />
        <Accordion name="Regions" options={optionsRegions} fnSelect={fnRegionAdd} fnUnSelect={fnRegionRemove} />
        <Accordion name="Languages" options={optionsLanguages} fnSelect={fnLanguageAdd} fnUnSelect={fnLanguageRemove} />
      </div>
    </div>
  );
}

export default Sidebar;
