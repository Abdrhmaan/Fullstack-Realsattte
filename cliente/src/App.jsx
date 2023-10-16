import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import react from 'react'



import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
 import Signin from './pages/Signin'
import About from './pages/About'
import Creatlisting from './pages/Creatlisting'
import Updatelisting from './pages/Updatelisting'
import Header from './Components/Header'
import PrivateRouter from './Components/PrivateRouter'
import Listing from './pages/Listing'
import Search from './pages/Search'

const App = () => {
  return (
    <>
  
    <Header/>
    <Routes>
   
   <Route path='/'  element={<Home/>} />
   <Route  element={<PrivateRouter/>}  >
   <Route path='/profile'  element={<Profile/>}                 />
   <Route path='/createlisting'  element={<Creatlisting/>} />
    
   </Route>
   
   
  
   <Route path='/signup'  element={<Signup/>} />
   <Route path='/sigin'  element={<Signin/>} />
   <Route path='/about'  element={<About/>} />
   <Route path='/listing/:listingId'  element={<Listing/>} />
   <Route path='/search' element={<Search />} />
  
   <Route path='/update/:listingId'  element={<Updatelisting/>} />

    </Routes>
    </>
  
  )
}

export default App