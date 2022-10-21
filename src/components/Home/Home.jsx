import React, { useState } from 'react';
import ALL_COUNTRIES from './all_countries.json';
import fnSanitize from '../../utils/fnSanitize';
import { fnFindIntersectionArray, fnFindUniqueArray } from '../../utils/arrays';
import AppContext from './AppContext';
import Header from './Header';
import Sidebar from './Sidebar/Sidebar';
import Container from '../common/Container';
import DisplayError from './DisplayError';
import CardSmall from './CardSmall';

function Home() {
  // sidebar
  const [stSidebar, setStSidebar] = useState(false);

  // filter
  const [stCountries, setStCountries] = useState({
    region: [],
    languages: [],
    timezones: [],
    match: [],
    display: ALL_COUNTRIES,
  });

  function fnGetAllCountriesIfArrayIsEmpty(array) {
    if (array.length > 0) {
      return array;
    }

    return ALL_COUNTRIES;
  }

  // name
  const [stNameValue, setStNameValue] = useState('');

  function fnNameOnChange(value) {
    setStNameValue(value);
    setStCountries((prev) => ({
      ...prev,
      display: fnGetAllCountriesIfArrayIsEmpty(stCountries.match).filter((country) => fnSanitize(country.name.common).includes(fnSanitize(value))),
    }));
  }

  // checkboxes
  function fnFilterToggle(key, countries) {
    setStNameValue('');
    setStCountries((prev) => ({
      ...prev,
      [key]: countries,
      match: fnFindIntersectionArray(fnGetAllCountriesIfArrayIsEmpty(countries), ...Object.keys(stCountries).filter((objectKey) => objectKey !== 'match' && objectKey !== 'display' && objectKey !== key).map((objectKey) => fnGetAllCountriesIfArrayIsEmpty(stCountries[objectKey]))),
      display: fnFindIntersectionArray(fnGetAllCountriesIfArrayIsEmpty(countries), ...Object.keys(stCountries).filter((objectKey) => objectKey !== 'match' && objectKey !== 'display' && objectKey !== key).map((objectKey) => fnGetAllCountriesIfArrayIsEmpty(stCountries[objectKey]))),
    }));
  }

  function fnFilterAdd(key) {
    return function (value) {
      const countriesFound = ALL_COUNTRIES.filter((country) => fnSanitize(country[key]).includes(fnSanitize(value)));
      const countriesUnique = fnFindUniqueArray(countriesFound, stCountries[key]);
      const countriesAdded = stCountries[key].concat(countriesUnique);
      fnFilterToggle(key, countriesAdded);
    };
  }

  function fnFilterRemove(key) {
    return function (value) {
      const countriesFound = stCountries[key].filter((country) => !fnSanitize(country[key]).includes(fnSanitize(value)));
      fnFilterToggle(key, countriesFound);
    };
  }

  // context
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const countriesContextValue = {
    countries: ALL_COUNTRIES,
    stSidebar,
    setStSidebar,
    stNameValue,
    fnNameOnChange,
    fnRegionAdd: fnFilterAdd('region'),
    fnRegionRemove: fnFilterRemove('region'),
    fnLanguageAdd: fnFilterAdd('languages'),
    fnLanguageRemove: fnFilterRemove('languages'),
    fnTimezoneAdd: fnFilterAdd('timezones'),
    fnTimezoneRemove: fnFilterRemove('timezones'),
  };

  return (
    <main>
      <AppContext.Provider value={countriesContextValue}>
        <Header />
        <Container className="flex max-w-full">
          <div className="xl:w-3/12 xl:pr-8 2xl:w-1/5">
            <Sidebar />
          </div>
          <div className="w-full xl:w-9/12 xl:pl-8 2xl:w-4/5">
            <div className="mt-16 mb-16">
              Total:
              {' '}
              {stCountries.display.length}
            </div>

            {stCountries.display.length > 0
              ? (
                <ul className="flex flex-wrap -m-8 mb-8">
                  {stCountries.display.map((country) => <CardSmall key={country.name.common} country={country} />)}
                </ul>
              )
              : (
                <DisplayError message="Country not found." />
              )}
          </div>
        </Container>
      </AppContext.Provider>
    </main>
  );
}

export default Home;
