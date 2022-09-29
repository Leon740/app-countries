import React from 'react';
import { BsMoon } from 'react-icons/bs';
import Container from './common/Container';

function Header() {
  return (
    <header className="shadow-md shadow-slate-200 dark:shadow-gray-800 sticky top-0 z-20 bg-white dark:bg-customgray-200">
      <Container as="section" className="pt-4 pb-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">Countries App</h1>

        <button type="button" className="flex items-center pt-2 pb-2 pl-4 pr-4 rounded-lg bg-white dark:bg-customgray-200 shadow-md shadow-slate-200 dark:shadow-gray-800 hover:shadow-inner hover:shadow-slate-300 dark:hover:shadow-gray-900">
          <BsMoon />
          <span className="text-base ml-2">Toggle Mode</span>
        </button>
      </Container>
    </header>
  );
}

export default Header;
