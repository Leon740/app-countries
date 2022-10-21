/* eslint-disable no-case-declarations */
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
  // filter
  const [stCountries, setStCountries] = useState({
    regions: [],
    languages: [],
    timezones: [],
    match: [],
    display: ALL_COUNTRIES,
  });

  const [stNameValue, setStNameValue] = useState('');

  function fnGetAllCountriesIfArrayIsEmpty(array) {
    if (array.length > 0) {
      return array;
    }

    return ALL_COUNTRIES;
  }

  function fnFilterBy(type) {
    // eslint-disable-next-line func-names
    return function (value) {
      let result;
      switch (type) {
        case 'name':
          setStNameValue(value);
          result = (stCountries.match.length > 0 ? stCountries.match : ALL_COUNTRIES).filter((country) => fnSanitize(country.name.common).includes(fnSanitize(value)));
          setStCountries((prev) => ({
            ...prev,
            display: result,
          }));
          break;

        case 'regionAdd':
          setStNameValue('');
          result = ALL_COUNTRIES.filter((country) => fnSanitize(country.region).includes(fnSanitize(value)));
          const regions = stCountries.regions.concat(result);
          setStCountries((prev) => ({
            ...prev,
            regions,
            match: fnFindIntersectionArray(regions, fnGetAllCountriesIfArrayIsEmpty(prev.languages), fnGetAllCountriesIfArrayIsEmpty(prev.timezones)),
            display: fnFindIntersectionArray(regions, fnGetAllCountriesIfArrayIsEmpty(prev.languages), fnGetAllCountriesIfArrayIsEmpty(prev.timezones)),
          }));
          break;

        case 'regionRemove':
          setStNameValue('');
          result = stCountries.regions.filter((country) => !fnSanitize(country.region).includes(fnSanitize(value)));
          setStCountries((prev) => ({
            ...prev,
            regions: result,
            match: fnFindIntersectionArray(fnGetAllCountriesIfArrayIsEmpty(result), fnGetAllCountriesIfArrayIsEmpty(prev.languages), fnGetAllCountriesIfArrayIsEmpty(prev.timezones)),
            display: fnFindIntersectionArray(fnGetAllCountriesIfArrayIsEmpty(result), fnGetAllCountriesIfArrayIsEmpty(prev.languages), fnGetAllCountriesIfArrayIsEmpty(prev.timezones)),
          }));
          break;

        case 'languageAdd':
          setStNameValue('');
          result = ALL_COUNTRIES.filter((country) => fnSanitize(country.languages).includes(fnSanitize(value)));
          const languages = stCountries.languages.concat(fnFindUniqueArray(result, stCountries.languages));
          setStCountries((prev) => ({
            ...prev,
            languages,
            match: fnFindIntersectionArray(languages, fnGetAllCountriesIfArrayIsEmpty(prev.regions), fnGetAllCountriesIfArrayIsEmpty(prev.timezones)),
            display: fnFindIntersectionArray(languages, fnGetAllCountriesIfArrayIsEmpty(prev.regions), fnGetAllCountriesIfArrayIsEmpty(prev.timezones)),
          }));
          break;

        case 'languageRemove':
          setStNameValue('');
          result = stCountries.languages.filter((country) => !fnSanitize(country.languages).includes(fnSanitize(value)));
          setStCountries((prev) => ({
            ...prev,
            languages: result,
            match: fnFindIntersectionArray(fnGetAllCountriesIfArrayIsEmpty(result), fnGetAllCountriesIfArrayIsEmpty(prev.regions), fnGetAllCountriesIfArrayIsEmpty(prev.timezones)),
            display: fnFindIntersectionArray(fnGetAllCountriesIfArrayIsEmpty(result), fnGetAllCountriesIfArrayIsEmpty(prev.regions), fnGetAllCountriesIfArrayIsEmpty(prev.timezones)),
          }));
          break;

        case 'timezoneAdd':
          setStNameValue('');
          result = ALL_COUNTRIES.filter((country) => fnSanitize(country.timezones).includes(fnSanitize(value)));
          const timezones = stCountries.timezones.concat(fnFindUniqueArray(result, stCountries.timezones));
          setStCountries((prev) => ({
            ...prev,
            timezones,
            match: fnFindIntersectionArray(timezones, fnGetAllCountriesIfArrayIsEmpty(prev.regions), fnGetAllCountriesIfArrayIsEmpty(prev.languages)),
            display: fnFindIntersectionArray(timezones, fnGetAllCountriesIfArrayIsEmpty(prev.regions), fnGetAllCountriesIfArrayIsEmpty(prev.languages)),
          }));
          break;

        case 'timezoneRemove':
          setStNameValue('');
          result = stCountries.timezones.filter((country) => !fnSanitize(country.timezones).includes(fnSanitize(value)));
          setStCountries((prev) => ({
            ...prev,
            timezones: result,
            match: fnFindIntersectionArray(fnGetAllCountriesIfArrayIsEmpty(result), fnGetAllCountriesIfArrayIsEmpty(prev.regions), fnGetAllCountriesIfArrayIsEmpty(prev.languages)),
            display: fnFindIntersectionArray(fnGetAllCountriesIfArrayIsEmpty(result), fnGetAllCountriesIfArrayIsEmpty(prev.regions), fnGetAllCountriesIfArrayIsEmpty(prev.languages)),
          }));
          break;

        default: result = ALL_COUNTRIES;
      }
    };
  }

  // sidebar
  const [stSidebar, setStSidebar] = useState(false);

  // context
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const countriesContextValue = {
    countries: ALL_COUNTRIES,
    stSidebar,
    setStSidebar,
    stNameValue,
    fnNameOnChange: fnFilterBy('name'),
    fnRegionAdd: fnFilterBy('regionAdd'),
    fnRegionRemove: fnFilterBy('regionRemove'),
    fnLanguageAdd: fnFilterBy('languageAdd'),
    fnLanguageRemove: fnFilterBy('languageRemove'),
    fnTimezoneAdd: fnFilterBy('timezoneAdd'),
    fnTimezoneRemove: fnFilterBy('timezoneRemove'),
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
