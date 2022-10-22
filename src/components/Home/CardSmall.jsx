/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BsArrowRightShort, BsHeart, BsHeartFill } from 'react-icons/bs';
import Feature from '../global/Feature';

function CardSmall({
  country, isFavorite, fnFavoritesOnChange,
}) {
  const {
    name: { common: nameCommon, official: nameOfficial }, cca2: code, flags: { svg: flagUrl }, region, population, languages, timezones,
  } = country;

  return (
    <li className="p-8 grow-0 w-full md:w-6/12 lg:w-4/12 2xl:w-3/12">
      <div className={`${isFavorite ? 'border-red-500' : 'border-transparent'} border-2 flex flex-col h-full rounded-lg overflow-hidden shadow-md shadow-slate-200 dark:shadow-gray-800 bg-white dark:bg-customgray-200`}>
        <img src={flagUrl} alt={nameOfficial} className="shrink-0 h-48 w-full object-cover" />
        <div className="h-full p-8 flex flex-col justify-between">
          <section>
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
            </ul>
          </section>

          <div className="flex justify-between">
            <Link to={`/country/${code}`} state={country} className="max-w-max flex items-center pt-2 pb-2 pl-4 pr-2 rounded-lg bg-white dark:bg-customgray-200 shadow-md shadow-slate-200 dark:shadow-gray-800 hover:shadow-inner hover:shadow-slate-300 dark:hover:shadow-gray-900">
              <span className="text-base mr-2">View</span>
              <BsArrowRightShort className="text-2xl" />
            </Link>

            <button type="button" onClick={() => fnFavoritesOnChange(country)} className="flex items-center justify-center w-10 h-10 rounded-full text-white bg-red-500 shadow-md shadow-red-300 dark:shadow-red-700 hover:shadow-inner hover:shadow-red-900">
              {isFavorite ? <BsHeartFill /> : <BsHeart />}
            </button>
          </div>
        </div>
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
    // eslint-disable-next-line react/forbid-prop-types
    languages: PropTypes.object,
    timezones: PropTypes.arrayOf(PropTypes.string),
  }),
  isFavorite: PropTypes.bool,
  fnFavoritesOnChange: PropTypes.func,
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
    timezones: ['time'],
  },
  isFavorite: false,
  fnFavoritesOnChange: () => {},
};

export default CardSmall;
