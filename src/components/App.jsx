import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home/Home';
import Detail from './Detail/Detail';
import NotFound from './NotFound';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:code" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
