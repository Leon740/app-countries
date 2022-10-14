/* eslint-disable import/order */
import React, { useContext } from 'react';
import AppContext from './AppContext';
import useWindowSize from '../../hooks/useWindowSize';
import { BsMoon } from 'react-icons/bs';
import { VscThreeBars } from 'react-icons/vsc';
import Container from '../common/Container';

function Header() {
  // mode
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  function fnModeToggler() {
    document.documentElement.classList.toggle('dark');
  }

  // sidebar
  const { width: windowWidth } = useWindowSize();

  const { setStSidebar } = useContext(AppContext);

  return (
    <header className="sticky top-0 z-20 h-20 flex items-center bg-white dark:bg-customgray-200 shadow-md shadow-slate-200 dark:shadow-gray-800">
      <Container className="max-w-full pt-4 pb-4 flex items-center justify-between">
        <div className="flex items-center">
          {windowWidth < 1280 && (
            <button type="button" onClick={() => setStSidebar((prev) => !prev)} className="p-2 bg-white dark:bg-customgray-200 shadow-md shadow-slate-200 dark:shadow-gray-800 rounded-full text-black dark:text-white focus:shadow-inner focus:shadow-slate-300 dark:focus:shadow-gray-900">
              <VscThreeBars className="text-xl" />
            </button>
          )}
          <h1 className="text-lg font-bold ml-4">Countries App</h1>
        </div>

        <button type="button" onClick={fnModeToggler} className="flex items-center pt-2 pb-2 pl-4 pr-4 rounded-lg bg-white dark:bg-customgray-200 shadow-md shadow-slate-200 dark:shadow-gray-800 hover:shadow-inner hover:shadow-slate-300 dark:hover:shadow-gray-900">
          <BsMoon />
          <span className="text-base ml-2">Toggle Mode</span>
        </button>
      </Container>
    </header>
  );
}

export default Header;
