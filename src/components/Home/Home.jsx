/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import fnSanitizeString from '../../utils/fnSanitizeString';
import ALL_COUNTRIES from '../../data.json';
import SearchControls from './SearchControls';
import Container from '../common/Container';
import DisplayError from './DisplayError';
import CardSmall from './CardSmall';

function Home() {
  const [stCountries, setStCountries] = useState(ALL_COUNTRIES);

  function fnSearchBy(type) {
    // eslint-disable-next-line func-names
    return function (value) {
      console.log(value);
      let result;
      switch (type) {
        case 'name': result = ALL_COUNTRIES.filter((country) => fnSanitizeString(country.name.common).includes(fnSanitizeString(value)));
          break;
        case 'region': result = ALL_COUNTRIES.filter((country) => fnSanitizeString(country.region).includes(fnSanitizeString(value)));
          break;
        default: result = ALL_COUNTRIES;
      }
      console.log(result);
      setStCountries(result || ALL_COUNTRIES);
    };
  }

  useEffect(() => {
    // console.clear();
    // stCountries.map((country) => console.log(country.name.common));
  }, [stCountries]);

  const fnSearchByName = fnSearchBy('name');
  const fnSearchByRegion = fnSearchBy('region');

  return (
    <main>
      <Container>
        <SearchControls fnInputOnChange={fnSearchByName} fnSelectOnChange={fnSearchByRegion} />

        {stCountries.length > 0
          ? (
            <ul className="flex flex-wrap -mt-8 -ml-8 -mr-8 mb-8">
              {stCountries.map((country) => <CardSmall key={country.name.common} country={country} />)}
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
