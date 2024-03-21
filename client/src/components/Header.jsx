import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../components/style.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, []);
  return (
    <header className='bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'> 
        {/* Logo */}
        <Link to='/' className='text-white'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap gap-1'>
            <span>RECIPE</span>
            <span className='text-blue-800'>XPLORER</span>
          </h1>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className='bg-white bg-opacity-50 p-3 rounded-lg flex items-center ml-4 sm:ml-8'>
          <input
            type="text"
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64 text-blue-800'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
          <FaSearch className='text-blue-800 ml-2' />
          </button>
        </form>

        {/* Navigation Links */}
        <ul className='flex gap-4'>
          <Link to='/' className='nav-link'>
            <li className='hidden sm:inline text-white'>Home</li>
          </Link>
          <Link to='/about' className='nav-link'>
            <li className='hidden sm:inline text-white'>About</li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className='text-white'>Login</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
