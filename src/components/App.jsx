/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';

// Icons
import { BsMoon, BsSearch } from 'react-icons/bs';

// Components
import Container from './Container';
import CardSmall from './CardSmall/CardSmall';
import fnSanitizeString from '../utils/fnSanitizeString';

function App() {
  const [stCountries, setStCountries] = useState(null);
  const [stStatus, setStStatus] = useState({ status: 'pending', error: '' });
  const [stSearchQuery, setStSearchQuery] = useState('');

  // Fetch data
  useEffect(() => {
    // setStStatus({ status: 'pending', error: '' });
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => {
        if (!response.ok) {
          setStStatus({ status: 'rejected', error: response.status });
        }
        return response.json();
      })
      .then((data) => {
        if (data.length) {
          setStCountries(data);
          setStStatus({ status: 'fulfilled', error: '' });
        }
      });
  }, []);

  // Search
  // TODO: search focus
  const isSearchQuery = stSearchQuery.length > 1;

  function fnHandleSearch() {
    if (isSearchQuery) {
      const result = stCountries.filter((country) => fnSanitizeString(country.name.common).includes(fnSanitizeString(stSearchQuery)));
      return result;
    }

    return stCountries;
  }

  return (
    <main className="bg-slate-50">
      <header className="bg-white shadow-lg shadow-slate-150 sticky top-0 z-20">
        <Container as="section" className="pt-4 pb-4 flex items-center justify-between">
          <h1 className="text-lg font-bold">Countries App</h1>
          <button type="button" className="flex items-center text-sm hover:underline">
            <BsMoon />
            <span className="ml-1">Dark Mode</span>
          </button>
        </Container>
      </header>

      <Container>
        {stStatus.status === 'pending' && (
          <div className="flex justify-center items-center mt-16 mb-16">
            <div className="border-t-transparent border-solid border-black animate-spin w-16 h-16 border-4 rounded-full" role="status">
              <span className="hidden" />
            </div>
          </div>
        )}

        {stStatus.status === 'fulfilled' && (
          <>
            <div className="mt-16">
              <div className="relative w-full lg:w-1/3">
                <BsSearch className="mr-6 text-xl absolute left-6 top-4" />
                <input
                  id="search"
                  placeholder="Search for country"
                  className="text-base pr-6 pl-16 pt-4 pb-4 w-full outline-0 bg-white rounded-lg transition ease-in-out duration-300 shadow-slate-150 shadow-lg focus:shadow-xl"
                  value={stSearchQuery}
                  onChange={(event) => setStSearchQuery(event.target.value)}
                />
              </div>
            </div>
            <ul className="flex flex-wrap mt-8 -ml-8 -mr-8 mb-8">
              {fnHandleSearch().map((country) => (
                <CardSmall key={country.name.common} country={country} />
              ))}
            </ul>
          </>
        )}

        {stStatus.status === 'rejected' && (
          <div className="mt-16 mb-16 text-lg">
            {stStatus.error}
            {' '}
            Error
          </div>
        )}
      </Container>
    </main>
  );
}

export default App;
