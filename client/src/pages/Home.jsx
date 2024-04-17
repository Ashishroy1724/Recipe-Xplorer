/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaPinterest } from 'react-icons/fa';
import ListingItem from '../components/ListingItem'; // Import the ListingItem component
import './style.css';

export default function Home() {
  const [recentListings, setRecentListings] = useState([]);

  useEffect(() => {
    const fetchRecentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?limit=4`); // Fetch recent listings without any specific filters
        const data = await res.json();
        setRecentListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecentListings();
  }, []);

  return (
    <div className='bg-white min-h-screen'> {/* Adjusted the overall background color */}
      <div className="bg">
      <div className='flex flex-col justify-center items-center gap-3 p-28 px-6 max-w-6xl mx-auto'>
      <h1 className="mt-16 text-5xl sm:text-6xl font-bold leading-tight text-center text-white fade-in">
        Find Your <span className="text-yellow-300">Perfect</span> Recipe With Ease
      </h1>
      <p className="mt-4 text-center text-gray-200 text-sm sm:text-base fade-in">
         Recipe Explorer is the best place to discover your next perfect meal. We offer a wide range of recipes for you to choose from.
      </p>
        <Link
          to="/recipe-generator"
          className="mt-24 mb-28 px-4 py-2 bg-yellow-400 text-teal-800 font-bold rounded-md transition duration-300 hover:bg-yellow-500 hover:text-white"
        >
          <span className="typewriter-text">Generate Your Recipe Now</span>
        </Link>
      </div>
      </div>
    

      {/* Recent Listings Section */}
      <div className=" min-h-4 p-8">
        <h2 className=" text-5xl font-bold mb-4 text-center text-teal-800 uppercase">Recent Listings</h2> {/* Adjusted the heading color */}
        <div className='bg-yellow-300 p-7 rounded-2xl'> {/* Adjusted the background color */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Map through recent listings and render ListingItem component */}
            {recentListings.map(listing => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          </div>
        </div>
      </div>

      {/* ----------- About Us ------------------ */}
      
      <div className='flex gap-5'>
        <p className='w-1/2 text-justify ml-8 mt-32 font-medium mb-40'>
          <span className='text-5xl font-bold text-teal-800 uppercase mt-9'>ABOUT US</span><br></br><br></br>
          Welcome to Recipe Explorer! We are passionate about providing you with the best recipes and culinary experiences.
          Our team of expert chefs and food enthusiasts curates a variety of recipes to help you discover new flavors and techniques.
          Whether you're a beginner or a seasoned cook, we have something for everyone. Explore, cook, and enjoy!</p>
        <div className='about'>

        </div>
       
      </div>

            {/* ------------- Footer ---------------- */}

      <div className="about-us-section bg-teal-600 p-8 rounded-t-2xl max-w-6xl mx-auto"> {/* Adjusted classes for styling */}
    <h2 className="text-5xl font-bold mb-4 text-center text-teal-800 uppercase">
      <span className='text-white'>RECIPE </span><span className='text-yellow-300'>EXPLORER</span>
      </h2> 
      <div className='text-center'>

          <Link to='/' className='nav-link'>
            <li className='hidden sm:inline font-semibold  text-white '>Home</li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline ml-10 font-semibold text-white hover:underline'>About</li>
          </Link>
      </div>
    <div className="flex justify-center gap-6 mt-6">
                    {/* Instagram Icon */}
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-3xl text-pink-800 hover:text-pink-700" />
                    </a>
                    {/* Instagram Icon */}
                    <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
                        <FaPinterest className="text-3xl text-red-800 hover:text-pink-700" />
                    </a>
                    
                    
                    
                    {/* Facebook Icon */}
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="text-3xl text-blue-800 hover:text-blue-900" />
                    </a>
                </div>
    </div>

    </div>
  );
}
