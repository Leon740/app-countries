/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import fnSanitizeString from '../utils/fnSanitizeString';
import Header from './Header';
import Loader from './Loader';
import DisplayError from './DisplayError';
import Container from './common/Container';
import SearchControls from './SearchControls';
import CardSmall from './CardSmall/CardSmall';

function App() {
  const API_BASE_URL = 'https://restcountries.com/v3.1/';
  const [stApiUrl, setStApiUrl] = useState(`${API_BASE_URL}all`);
  const [stCountries, setStCountries] = useState(null);
  const [stStatus, setStStatus] = useState({ status: 'pending', message: '' });

  // Fetch data
  useEffect(() => {
    setStStatus({ status: 'pending', message: '' });
    fetch(stApiUrl)
      .then((response) => {
        if (!response.ok) {
          setStStatus({ status: 'rejected', message: response.status });
        }
        return response.json();
      })
      .then((data) => {
        if (data.length) {
          setStCountries(data);
          setStStatus({ status: 'fulfilled', message: '' });
        }
      });
  }, [stApiUrl]);

  // Search
  const [stSearchQuery, setStSearchQuery] = useState('');

  function fnSearchInputOnChange() {
    if (stSearchQuery.length > 1) {
      const result = stCountries.filter((country) => fnSanitizeString(country.name.common).includes(fnSanitizeString(stSearchQuery)));
      return result;
    }

    return stCountries;
  }

  // Select
  function fnRegionOnChange(region) {
    setStSearchQuery('');
    setStApiUrl(`${API_BASE_URL}${region === 'all' ? 'all' : `region/${region}`}`);
  }

  return (
    <main className="text-black dark:text-white">
      <Header />

      <Container>
        <SearchControls inputValue={stSearchQuery} inputOnChange={setStSearchQuery} selectOnChange={fnRegionOnChange} />

        {stStatus.status === 'pending' && <Loader />}

        {stStatus.status === 'rejected' && <DisplayError message={`${stStatus.message} Error`} />}

        {stStatus.status === 'fulfilled' && (
          fnSearchInputOnChange().length > 0 ? (
            <ul className="flex flex-wrap mt-8 -ml-8 -mr-8 mb-8">
              {fnSearchInputOnChange().map((country) => (
                <CardSmall key={country.name.common} country={country} />
              ))}
            </ul>
          ) : (
            <DisplayError message="Not Found" />
          )
        )}
      </Container>
    </main>
  );
}

export default App;
