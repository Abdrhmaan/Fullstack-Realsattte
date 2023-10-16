
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import {  useNavigate } from 'react-router-dom';

import { FaSearch } from 'react-icons/fa';
const Header = () => {
  const {currentUser
  } =  useSelector((Sstate) => Sstate.user)

  const navigate = useNavigate();


  const [searchTerm, setSearchTerm] = useState('');
  console.log(searchTerm)


  const handlesubmit =(e)=> {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    console.log(urlParams)


  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
   <header className='bg-slate-200 shadow-md'>
    <div className='flex justify-between item-center max-w-6xl mx-auto p-3'>


    <h1 className='font-bold text-sm sm:text-xl flex-wrap'>
    <span className='text-slate-500'>Xaan</span>
    <span className='text-slate-700'>State</span>
   
    </h1>
    <form onSubmit={handlesubmit} className='bg-slate-100 p-3 rounded-lg flex items-center '>
        <input type='text' placeholder='search..'  className=' bg-transparent focus:outline-none w-24 sm:w-64' 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        
        />
        <button>
        <FaSearch className='text-slate-600' />


        </button>
      
    </form>
    <ul className='flex gap-4 text-center'>
        <Link to="/" >  <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li> </Link>
      
        <Link to="/about" >  <li className='hidden sm:inline text-slate-700 hover:underline'>about</li> </Link>
        <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )}
          </Link>

        
       
    </ul>
    </div>
 
   </header>
  )
}

export default Header