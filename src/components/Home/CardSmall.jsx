/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BsArrowRightShort } from 'react-icons/bs';
import Feature from '../global/Feature';

function CardSmall({ country }) {
  const {
    name: { common: nameCommon, official: nameOfficial }, cca2: code, flags: { svg: flagUrl }, region, population, languages, timezones, currencies,
  } = country;

  return (
    <li className="p-8 grow-0 w-full md:w-6/12 xl:w-4/12 2xl:w-3/12">
      <div className="h-full rounded-lg overflow-hidden shadow-md shadow-slate-200 dark:shadow-gray-800 bg-white dark:bg-customgray-200">
        <img src={flagUrl} alt={nameOfficial} className="h-48 w-full object-cover" />
        <section className="p-8">
          <h2 className="text-lg font-bold whitespace-nowrap overflow-hidden text-ellipsis w-full">{nameCommon}</h2>
          <ul className="mt-6 mb-6">
            <Feature name="Region">{region}</Feature>
            <Feature name="Population">{population.toLocaleString()}</Feature>
            <Feature name="Languages">
              <ul>
                {languages && Object.values(languages).map((language, index) => (
                  <li key={index}>
                    {language}
                  </li>
                ))}
              </ul>
            </Feature>
            <Feature name="Timezones">
              <ul>
                {timezones.map((timezone, index) => (
                  <li key={index}>
                    {timezone}
                  </li>
                ))}
              </ul>
            </Feature>
            <Feature name="Currencies">
              <ul>
                {currencies && Object.values(currencies).map((currency, index) => (
                  <li key={index}>
                    {currency.symbol}
                    {' '}
                    -
                    {' '}
                    {currency.name}
                  </li>
                ))}
              </ul>
            </Feature>
          </ul>

          <Link to={`/country/${code}`} state={country} className="max-w-max flex items-center pt-2 pb-2 pl-4 pr-2 rounded-lg bg-white dark:bg-customgray-200 shadow-md shadow-slate-200 dark:shadow-gray-800 hover:shadow-inner hover:shadow-slate-300 dark:hover:shadow-gray-900">
            <span className="text-base mr-2">View</span>
            <BsArrowRightShort className="text-2xl" />
          </Link>
        </section>
      </div>
    </li>
  );
}

CardSmall.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.shape({
      common: PropTypes.string,
      official: PropTypes.string,
    }),
    cca2: PropTypes.string,
    flags: PropTypes.shape({
      svg: PropTypes.string,
    }),
    region: PropTypes.string,
    population: PropTypes.number,
    languages: PropTypes.object,
    timezones: PropTypes.array,
    currencies: PropTypes.object,
  }),
};

CardSmall.defaultProps = {
  country: {
    name: {
      common: 'common name',
      official: 'official name',
    },
    cca2: '',
    flags: {
      svg: '',
    },
    region: 'region',
    population: 0,
    languages: {},
    timezones: ['lang'],
    currencies: {},
  },
};

export default CardSmall;
