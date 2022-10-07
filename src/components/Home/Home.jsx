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
  const [stCountries, setStCountries] = useState({
    display: ALL_COUNTRIES,
    match: [],
  });

  function fnFilterBy(type) {
    // eslint-disable-next-line func-names
    return function (value) {
      let result;
      switch (type) {
        case 'name':
          result = (stCountries.match.length ? stCountries.match : ALL_COUNTRIES).filter((country) => fnSanitizeString(country.name.common).includes(fnSanitizeString(value)));
          setStCountries((prev) => ({ ...prev, display: result }));
          break;

        case 'regionAdd':
          result = ALL_COUNTRIES.filter((country) => fnSanitizeString(country.region).includes(fnSanitizeString(value)));
          setStCountries((prev) => ({ ...prev, match: prev.match.concat(result), display: prev.match.concat(result) }));
          break;

        default: result = ALL_COUNTRIES;
      }
    };
  }

  const fnFilterByName = fnFilterBy('name');
  const fnFilterByRegionAdd = fnFilterBy('regionAdd');
  const fnFilterByRegionRemove = fnFilterBy('regionRemove');

  return (
    <main>
      <Header />
      <Container className="flex max-w-full">
        <div className="xl:w-3/12 xl:pr-8 2xl:w-1/5">
          <Sidebar fnNameOnChange={fnFilterByName} fnRegionAdd={fnFilterByRegionAdd} fnRegionRemove={fnFilterByRegionRemove} />
        </div>
        <div className="xl:w-9/12 xl:pl-8 2xl:w-4/5">
          <div className="mt-16 mb-16">
            Total:
            {' '}
            {stCountries.display.length}
          </div>

          {stCountries.display.length > 0
            ? (
              <ul className="flex flex-wrap -m-8">
                {stCountries.display.map((country) => <CardSmall key={country.name.common} country={country} />)}
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
