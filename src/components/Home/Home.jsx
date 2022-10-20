import React, { useState } from 'react';
import ALL_COUNTRIES from './all_countries.json';
import fnSanitize from '../../utils/fnSanitize';
import { fnFindIntersectionArray, fnFindUniqueArray } from '../../utils/array';
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
          setStCountries((prev) => ({
            ...prev,
            regions: prev.regions.concat(result),
            match: fnFindIntersectionArray(prev.regions.concat(result), fnGetAllCountriesIfArrayIsEmpty(prev.languages)),
            display: fnFindIntersectionArray(prev.regions.concat(result), fnGetAllCountriesIfArrayIsEmpty(prev.languages)),
          }));
          break;

        case 'regionRemove':
          setStNameValue('');
          result = stCountries.regions.filter((country) => !fnSanitize(country.region).includes(fnSanitize(value)));
          setStCountries((prev) => ({
            ...prev,
            regions: result,
            match: fnFindIntersectionArray(fnGetAllCountriesIfArrayIsEmpty(result), fnGetAllCountriesIfArrayIsEmpty(prev.languages)),
            display: fnFindIntersectionArray(fnGetAllCountriesIfArrayIsEmpty(result), fnGetAllCountriesIfArrayIsEmpty(prev.languages)),
          }));
          break;

        case 'languageAdd':
          setStNameValue('');
          result = ALL_COUNTRIES.filter((country) => fnSanitize(country.languages).includes(fnSanitize(value)));
          setStCountries((prev) => ({
            ...prev,
            languages: prev.languages.concat(fnFindUniqueArray(result, prev.languages)),
            match: fnFindIntersectionArray(prev.languages.concat(fnFindUniqueArray(result, prev.languages)), fnGetAllCountriesIfArrayIsEmpty(prev.regions)),
            display: fnFindIntersectionArray(prev.languages.concat(fnFindUniqueArray(result, prev.languages)), fnGetAllCountriesIfArrayIsEmpty(prev.regions)),
          }));
          break;

        case 'languageRemove':
          setStNameValue('');
          result = stCountries.languages.filter((country) => !fnSanitize(country.languages).includes(fnSanitize(value)));
          setStCountries((prev) => ({
            ...prev,
            languages: result,
            match: fnFindIntersectionArray(result.length > 0 ? result : ALL_COUNTRIES, fnGetAllCountriesIfArrayIsEmpty(prev.regions)),
            display: fnFindIntersectionArray(result.length > 0 ? result : ALL_COUNTRIES, fnGetAllCountriesIfArrayIsEmpty(prev.regions)),
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
