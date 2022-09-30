import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Detail from './Detail/Detail';
import NotFound from './NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:code" element={<Detail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
