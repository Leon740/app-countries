import React from 'react';
import { Link } from 'react-router-dom';
import Container from './common/Container';

function NotFound() {
  return (
    <main>
      <Container className="text-center">
        <h1 className="text-6xl mt-16">404</h1>
        <h2 className="text-3xl mt-8">Page not found</h2>
        <Link to="/" className="max-w-max flex items-center pt-2 pb-2 pl-4 pr-4 mt-16 mx-auto rounded-lg bg-white dark:bg-customgray-200 shadow-md shadow-slate-200 dark:shadow-gray-800 hover:shadow-inner hover:shadow-slate-300 dark:hover:shadow-gray-900">
          <span className="text-base">Homepage</span>
        </Link>
      </Container>
    </main>
  );
}

export default NotFound;
