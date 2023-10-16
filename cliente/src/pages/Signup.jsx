import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
 import OthComponents from '../Components/OthComponents';

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigaet  = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


  const handlesubmit = async(e)=> {
    e.preventDefault();
    console.log(formData)
    try{
      const res = await fetch('/api/authentcation/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data)
     if(data.success === false){

      setLoading(false)
      setError(error.massge)
      return
     }
     

     setLoading(false);
     setError(null);
     navigaet("/sigin")


    

    }catch(e){
      setLoading(false)
      setError(e.message
        )
    }
  }
  return (
    <div className=' p-3  max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-6'>
        Signup
      </h1>

      <form onSubmit={handlesubmit}  className='flex flex-col gap-6 my-5'>
        <input type='text' placeholder='username'  id='username' className='border rounded-lg p-3' onChange={handleChange}/>
        <input type='text' placeholder='email'  id='email' className='border rounded-lg p-3'  onChange={handleChange}/>
        <input type='passowrd' placeholder='password'  id='password' className='border rounded-lg p-3'  onChange={handleChange}/>
        <button className='bg-slate-700 p-3 text-center rounded-lg uppercase hover:opacity-95 text-white'>Signup</button>
        <OthComponents/>
      </form>
      <div className='flex gap-6 mt-5'>
      <p>Have acconte </p>
      <Link to={"/sigin"}> <span>Sigin</span></Link>

      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    
    </div>
  )
}

export default Signup