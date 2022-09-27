import React from 'react';
import PropTypes from 'prop-types';

// Components
import FeaturesItem from './FeaturesItem';

function CardSmall({ country }) {
  const {
    name: { common: nameCommon, official: nameOfficial }, flags: { svg: flagUrl }, region, continents, timezones, population,
  } = country;

  return (
    <li className="p-8 grow-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5">
      <div className="rounded-lg overflow-hidden shadow-lg shadow-slate-150 bg-white h-full">
        <img src={flagUrl} alt={nameOfficial} className="w-full h-32 object-cover" />
        <section className="p-8">
          <h2 className="text-lg font-bold mb-4 whitespace-nowrap overflow-hidden text-ellipsis w-full">{nameCommon}</h2>
          <ul>
            <FeaturesItem feature="Region">
              {region}
            </FeaturesItem>
            <FeaturesItem feature="Continent">
              {continents}
            </FeaturesItem>
            <FeaturesItem feature={`Timezone${timezones.slice(0, 3).length > 1 ? 's' : ''}`}>
              <ul className="flex flex-col">
                {timezones && timezones.slice(0, 3).map((timezone, index) => (
                  <li key={timezone}>
                    {timezone}
                    {index === timezones.slice(0, 3).length - 1 ? '' : ','}
                  </li>
                ))}
              </ul>
            </FeaturesItem>
            <FeaturesItem feature="Population">
              {population}
            </FeaturesItem>
          </ul>
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
    timezones: PropTypes.arrayOf(PropTypes.string),
    population: PropTypes.number,
  }),
};

CardSmall.defaultProps = {
  country: {
    name: {
      common: 'Common name',
      official: 'Official name',
    },
    flags: {
      svg: '',
    },
    region: 'region',
    continents: ['continents'],
    timezones: ['timezones'],
    population: 0,
  },
};

export default CardSmall;
