/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {

  return (
    <div className='bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500 min-h-screen'>
      <div className='flex flex-col justify-center items-center gap-3 text-white p-28 px-6 max-w-6xl mx-auto'>
        <h1 className="text-4xl sm:text-6xl font-bold leading-tight text-center">
          Find Your <span className="text-blue-800">Perfect</span> Recipe With Ease
        </h1>
        <p className="mt-4 text-center text-gray-300 text-sm sm:text-base">
          Recipe Explorer is the best place to discover your next perfect meal. We offer a wide range of recipes for you to choose from.
        </p>
        <Link
          to="/recipe-generator"
          className="mt-6 px-4 py-2 bg-white text-blue-800 font-bold rounded-md transition duration-300 hover:bg-blue-800 hover:text-gray-100"
        >
          Generate Your Recipe Now
        </Link>
      </div>
      
    </div>
  );
}
