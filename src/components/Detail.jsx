/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import Container from './common/Container';
import Feature from './global/Feature';

function Detail() {
  const { state: country } = useLocation();
  const {
    name: { official: nameOfficial, nativeName }, cca2: code, flags: { svg: flagUrl }, coatOfArms: { svg: coatOfArmsUrl }, region, capital, population, languages, timezones, currencies, borders,
  } = country;

  return (
    <main>
      <Container>
        <Link to="/" className="max-w-max flex items-center pt-2 pb-2 pl-2 pr-4 mt-16 mb-16 rounded-lg bg-white dark:bg-customgray-200 shadow-md shadow-slate-200 dark:shadow-gray-800 hover:shadow-inner hover:shadow-slate-300 dark:hover:shadow-gray-900">
          <BsArrowLeftShort className="text-2xl" />
          <span className="text-base ml-2">Back</span>
        </Link>

        <div className="-ml-8 -mr-8 2xl:-ml-16 2xl:-mr-16 flex flex-col lg:flex-row">
          <div className="pl-8 pr-8 2xl:pl-16 2xl:pr-16 lg:w-6/12">
            <img src={flagUrl} alt={nameOfficial} />
            <img src={coatOfArmsUrl} alt={nameOfficial} className="h-32 mt-16" />
          </div>
          <section className="pl-8 pr-8 2xl:pl-16 2xl:pr-16 lg:w-6/12">
            <h1 className="font-bold text-2xl mt-16 lg:mt-0">
              {nameOfficial}
              {', '}
              {code}
              <br />
            </h1>
            <h2 className="text-xl mt-8 mb-8">{nativeName && Object.values(nativeName)[0].official}</h2>
            <ul className="-ml-8 -mr-8 flex flex-col sm:flex-row">
              <div className="pl-8 pr-8 sm:w-6/12">
                <Feature name="Region">
                  {region}
                </Feature>
                <Feature name="Capital">
                  {capital}
                </Feature>
                <Feature name="Population">
                  {population}
                </Feature>
                <Feature name="Languages">
                  <ul>
                    {languages && Object.values(languages).map((language, index) => (
                      <li key={index}>
                        {language}
                      </li>
                    ))}
                  </ul>
                </Feature>
              </div>
              <div className="pl-8 pr-8 sm:w-6/12">
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
                <Feature name="Borders">
                  <ul>
                    {borders && borders.map((border, index) => (
                      <li key={index} className="inline">
                        {border}
                        {index === borders.length - 1 ? ' ' : ', '}
                      </li>
                    ))}
                  </ul>
                </Feature>
              </div>
            </ul>
          </section>
        </div>
      </Container>
    </main>
  );
}

export default Detail;
