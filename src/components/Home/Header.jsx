/* eslint-disable import/order */
import React, { useContext, useState, memo } from 'react';
import AppContext from './AppContext';
import useWindowSize from '../../hooks/useWindowSize';
import { VscThreeBars } from 'react-icons/vsc';
import { BsHeartFill } from 'react-icons/bs';
import Container from '../common/Container';
import { Link } from 'react-router-dom';
import DisplayError from './DisplayError';

function Header() {
  const { fnSidebarToggle, favorites } = useContext(AppContext);

  // mode
  const [stDarkMode, setStDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (stDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // sidebar
  const { width: windowWidth } = useWindowSize();

  // favorites
  const [stFavoritesPanel, setStFavoritesPanel] = useState(false);

  return (
    <header className="sticky z-30 top-0 z-20 h-20 flex items-center bg-white dark:bg-customgray-200 shadow-md shadow-slate-200 dark:shadow-gray-800">
      <Container className="relative max-w-full pt-4 pb-4 flex items-center justify-between">
        <div className="flex items-center">
          {windowWidth < 1280 && (
            <button type="button" onClick={() => { fnSidebarToggle((prev) => !prev); setStFavoritesPanel(false); }} className="p-2 bg-white dark:bg-customgray-200 shadow-md shadow-slate-200 dark:shadow-gray-800 rounded-full text-black dark:text-white focus:shadow-inner focus:shadow-slate-300 dark:focus:shadow-gray-900">
              <VscThreeBars className="text-xl" />
            </button>
          )}
          <h1 className="text-lg font-bold ml-4">Countries App</h1>
        </div>

        {stFavoritesPanel && (
          <div className="absolute z-10 right-8 top-20 w-64 max-h-96 overflow-y-auto p-4 rounded-lg bg-white dark:bg-customgray-200 shadow-md shadow-slate-200 dark:shadow-gray-800">
            {favorites.length > 0 ? (
              <ul className="-my-2">
                {favorites.map((country) => {
                  const { name: { common: nameCommon }, cca2: code, flags: { svg: flagUrl } } = country;

                  return (
                    <li key={nameCommon} className="py-2">
                      <Link to={`/country/${code}`} state={country} className="flex items-center">
                        <div className="w-16 shrink-0 rounded overflow-hidden">
                          <img alt={nameCommon} src={flagUrl} />
                        </div>
                        <div className="ml-2 text-sm">{nameCommon}</div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <DisplayError message="No favorites" />
            )}
          </div>
        )}

        <div className="flex items-center">
          <button type="button" onClick={() => setStFavoritesPanel((prev) => !prev)} className="mr-8 text-sm flex items-center py-2 px-4 rounded-lg text-white bg-red-500 shadow-md shadow-red-300 dark:shadow-red-700 hover:shadow-inner hover:shadow-red-900">
            <BsHeartFill />
            <span className="ml-2">
              (
              {favorites.length}
              )
            </span>
          </button>

          <button type="button" onClick={() => setStDarkMode((prev) => !prev)} className="relative w-16 h-6 rounded-lg bg-gray-200 dark:bg-customgray-200 dark:shadow-md dark:shadow-gray-800">
            <span className={`absolute w-4 h-4 rounded-full bg-customgray-200 dark:bg-white top-1 ${stDarkMode ? 'right-1' : 'left-1'}`} />
            <span className={`absolute top-1/2 -translate-y-1/2 ${stDarkMode ? 'left-1' : 'right-1'} text-xs`}>{stDarkMode ? 'on' : 'off'}</span>
          </button>
        </div>
      </Container>
    </header>
  );
}

export default memo(Header);
