/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import fnSanitizeString from '../../utils/fnSanitizeString';
import ALL_COUNTRIES from '../../data.json';
import SearchControls from './SearchControls';
import Container from '../common/Container';
import DisplayError from './DisplayError';
import CardSmall from './CardSmall';

function Home() {
  // eslint-disable-next-line no-unused-vars
  const [stDisplayCountries, setStDisplayCountries] = useState(ALL_COUNTRIES);
  const [stMatchingCountries, setStMatchingCountries] = useState(ALL_COUNTRIES);

  function fnSearchBy(type) {
    // eslint-disable-next-line func-names
    return function (value) {
      console.log(value);
      let result;
      switch (type) {
        case 'name':
          result = stMatchingCountries.filter((country) => fnSanitizeString(country.name.common).includes(fnSanitizeString(value)));
          setStDisplayCountries(result);
          break;
        case 'region':
          result = ALL_COUNTRIES.filter((country) => fnSanitizeString(country.region).includes(fnSanitizeString(value)));
          setStMatchingCountries(result.length > 0 ? result : ALL_COUNTRIES);
          setStDisplayCountries(result.length > 0 ? result : ALL_COUNTRIES);
          break;
        default: result = ALL_COUNTRIES;
      }
    };
  }

  const fnSearchByName = fnSearchBy('name');
  const fnSearchByRegion = fnSearchBy('region');

  return (
    <main>
      <Container>
        <SearchControls fnInputOnChange={fnSearchByName} fnSelectOnChange={fnSearchByRegion} />

        {stDisplayCountries.length > 0
          ? (
            <ul className="flex flex-wrap -mt-8 -ml-8 -mr-8 mb-8">
              {stDisplayCountries.map((country) => <CardSmall key={country.name.common} country={country} />)}
            </ul>
          )
          : (
            <DisplayError message="Country not found." />
          )}
      </Container>
    </main>
  );
}

export default Home;
