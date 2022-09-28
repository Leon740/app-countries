import React from 'react';
import { BsMoon } from 'react-icons/bs';
import Container from './common/Container';

function Header() {
  return (
    <header className="shadow-md shadow-slate-200 dark:shadow-gray-800 sticky top-0 z-20 bg-white dark:bg-customgray-200">
      <Container as="section" className="pt-4 pb-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">Countries App</h1>
        <button type="button" className="flex items-center text-sm hover:underline">
          <BsMoon />
          <span className="ml-1">Dark Mode</span>
        </button>
      </Container>
    </header>
  );
}

export default Header;
