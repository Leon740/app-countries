import React from 'react';

function Loader() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-16 h-16 rounded-full border-t-transparent dark:border-t-transparent border-4 border-solid border-black dark:border-white animate-spin" role="status" />
    </div>
  );
}

export default Loader;
