/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useMemo } from 'react';
import ALL_COUNTRIES from './all_countries.json';
import fnSanitize from '../../utils/fnSanitize';
import Header from './Header';
import Sidebar from './Sidebar/Sidebar';
import Container from '../common/Container';
import DisplayError from './DisplayError';
import CardSmall from './CardSmall';

function Home() {
  const [stCountries, setStCountries] = useState({
    display: ALL_COUNTRIES,
    match: [],
  });

  const [stNameValue, setStNameValue] = useState('');

  // const arrayOne = [1, 2, 3, 4];
  // const arrayTwo = [1, 2];

  // const arrayResult1 = arrayOne.filter((item) => arrayTwo.includes(item)); // [1, 2]
  // const arrayResult2 = arrayOne.filter((item) => !arrayTwo.includes(item)); // [3, 4]
  // console.log(arrayResult1);
  // console.log(arrayResult2);

  function fnFilterBy(type) {
    // eslint-disable-next-line func-names
    return function (value) {
      let result;
      switch (type) {
        case 'name':
          result = (stCountries.match.length > 0 ? stCountries.match : ALL_COUNTRIES).filter((country) => fnSanitize(country.name.common).includes(fnSanitize(value)));
          setStCountries((prev) => ({
            ...prev,
            display: result,
          }));
          setStNameValue(value);
          break;

        case 'regionAdd':
          result = (stCountries.match.length > 0 ? stCountries.match : ALL_COUNTRIES).filter((country) => fnSanitize(country.region).includes(fnSanitize(value)));
          setStCountries((prev) => ({
            ...prev,
            match: (prev.match.length > 0 ? prev.match : ALL_COUNTRIES).filter((country) => result.includes(country)),
            display: (prev.match.length > 0 ? prev.match : ALL_COUNTRIES).filter((country) => result.includes(country)),
          }));
          setStNameValue('');
          break;

        case 'regionRemove':
          setStCountries((prev) => ({
            ...prev,
            match: prev.match.filter((country) => !fnSanitize(country.region).includes(fnSanitize(value))),
            display: prev.match.filter((country) => !fnSanitize(country.region).includes(fnSanitize(value))).length > 0 ? prev.match.filter((country) => !fnSanitize(country.region).includes(fnSanitize(value))) : ALL_COUNTRIES,
          }));
          setStNameValue('');
          break;

        case 'languageAdd':
          result = (stCountries.match.length > 0 ? stCountries.match : ALL_COUNTRIES).filter((country) => fnSanitize(country.languages).includes(fnSanitize(value)));
          setStCountries((prev) => ({
            ...prev,
            match: (prev.match.length > 0 ? prev.match : ALL_COUNTRIES).filter((country) => result.includes(country)),
            display: (prev.match.length > 0 ? prev.match : ALL_COUNTRIES).filter((country) => result.includes(country)),
          }));
          setStNameValue('');
          break;

          // case 'languageRemove':
          // result = ALL_COUNTRIES.filter((country) => fnSanitize(country.languages).includes(fnSanitize(value)));
          // setStCountries((prev) => ({
          //   ...prev,
          //   match: prev.match.filter((country) => !result.includes(country)),
          //   display: prev.match.filter((country) => !result.includes(country)).length > 0 ? prev.match.filter((country) => !result.includes(country)) : ALL_COUNTRIES,
          // }));
          // setStNameValue('');
          // break;

        default: result = ALL_COUNTRIES;
      }
    };
  }

  const fnFilterByName = fnFilterBy('name');
  const fnFilterByRegionAdd = fnFilterBy('regionAdd');
  const fnFilterByRegionRemove = fnFilterBy('regionRemove');
  const fnFilterByLanguageAdd = fnFilterBy('languageAdd');
  const fnFilterByLanguageRemove = fnFilterBy('languageRemove');

  const [stSidebar, setStSidebar] = useState(false);

  return (
    <main>
      <Header fnSidebarToggler={setStSidebar} />
      <Container className="flex max-w-full">
        <div className="xl:w-3/12 xl:pr-8 2xl:w-1/5">
          <Sidebar
            active={stSidebar}
            nameValue={stNameValue}
            fnNameOnChange={fnFilterByName}
            fnRegionAdd={fnFilterByRegionAdd}
            fnRegionRemove={fnFilterByRegionRemove}
            fnLanguageAdd={fnFilterByLanguageAdd}
            fnLanguageRemove={fnFilterByLanguageRemove}
          />
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
    </main>
  );
}

export default Home;
