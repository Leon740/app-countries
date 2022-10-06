/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import ALL_COUNTRIES from './all_countries.json';
import fnSanitizeString from '../../utils/fnSanitizeString';
import Header from './Header';
import Sidebar from './Sidebar/Sidebar';
import Container from '../common/Container';
import DisplayError from './DisplayError';
import CardSmall from './CardSmall';

function Home() {
  // eslint-disable-next-line no-unused-vars
  const [stDisplayCountries, setStDisplayCountries] = useState(ALL_COUNTRIES);
  const [stMatchingCountries, setStMatchingCountries] = useState(ALL_COUNTRIES);

  function fnFilterBy(type) {
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

  const fnFilterByName = fnFilterBy('name');
  const fnFilterByRegion = fnFilterBy('region');

  return (
    <main>
      <Header />
      <Container className="flex max-w-full">
        <div className="xl:w-3/12 xl:pr-8">
          <Sidebar fnNameOnChange={fnFilterByName} fnRegionOnChange={fnFilterByRegion} />
        </div>
        <div className="xl:w-9/12 xl:pl-8">
          <div className="mt-16 mb-16">
            Total:
            {' '}
            {stDisplayCountries.length}
          </div>

          {stDisplayCountries.length > 0
            ? (
              <ul className="flex flex-wrap -m-8">
                {stDisplayCountries.map((country) => <CardSmall key={country.name.common} country={country} />)}
              </ul>
            )
            : (
              <DisplayError message="Country not found." />
            )}
        </div>
      </Container>
    </main>
  );
}

export default Home;
