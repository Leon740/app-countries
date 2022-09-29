import React from 'react';
import PropTypes from 'prop-types';
import { BsArrowRightShort } from 'react-icons/bs';
import Feature from './Feature';

function CardSmall({ country }) {
  const {
    name: { common: nameCommon, official: nameOfficial }, flags: { svg: flagUrl }, region, continents, population,
  } = country;

  return (
    <li className="p-8 grow-0 w-full sm:w-6/12 lg:w-4/12 xl:w-3/12 2xl:w-1/5">
      <div className="h-full rounded-lg overflow-hidden shadow-md shadow-slate-200 dark:shadow-gray-800 bg-white dark:bg-customgray-200">
        <img src={flagUrl} alt={nameOfficial} className="w-full h-32 object-cover" />
        <section className="p-8">
          <h2 className="text-lg font-bold whitespace-nowrap overflow-hidden text-ellipsis w-full">{nameCommon}</h2>
          <ul className="mt-6 mb-6">
            <Feature name="Region">{region}</Feature>
            <Feature name="Continent">{continents}</Feature>
            <Feature name="Population">{population.toLocaleString()}</Feature>
          </ul>

          <button type="button" className="flex items-center pt-2 pb-2 pl-4 pr-2 rounded-lg bg-white dark:bg-customgray-200 shadow-md shadow-slate-200 dark:shadow-gray-800 hover:shadow-inner hover:shadow-slate-300 dark:hover:shadow-gray-900">
            <span className="text-base mr-2">View</span>
            <BsArrowRightShort className="text-2xl" />
          </button>
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
    flags: PropTypes.shape({
      svg: PropTypes.string,
    }),
    region: PropTypes.string,
    continents: PropTypes.arrayOf(PropTypes.string),
    population: PropTypes.number,
  }),
};

CardSmall.defaultProps = {
  country: {
    name: {
      common: 'common name',
      official: 'official name',
    },
    flags: {
      svg: '',
    },
    region: 'region',
    continents: ['continents'],
    population: 0,
  },
};

export default CardSmall;
