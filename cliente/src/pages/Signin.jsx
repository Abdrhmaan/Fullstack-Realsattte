import React, { useState } from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInStart ,signInFailure,signInSuccess} from '../redux/user/userslice';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { errorHandler } from '../../../api/Utilis/error';
import OthComponents from '../Components/OthComponents';


const Signin = () => {


  const {loading , error

  } =  useSelector((Sstate) => Sstate.user)




  
  const navigate = useNavigate()
  const dispach = useDispatch()

  const [formData, setFormData] = useState({});
 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handlesubmiy= async(e)=> {
    e.preventDefault();


    try{
      dispach(signInStart())
      const res = await fetch('/api/authentcation/sigin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
  console.log(data)
      
     if(data.success === false){

      dispach(signInFailure(data.message

        ))
     
      return
     }
     

     dispach(signInSuccess(data))
  
     navigate("/")


    

    }catch(error){
      dispach(signInFailure(error.message
        ))
      console.log(error)
    
    }

  }
  return (
    <div className=' p-3  max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-6'>
        Signin
      </h1>

      <form onSubmit={handlesubmiy}  className='flex flex-col gap-6 my-5'>
       
        <input type='text' placeholder='email'  id='email' className='border rounded-lg p-3'  onChange={handleChange}/>
        <input type='passowrd' placeholder='password'  id='password' className='border rounded-lg p-3'  onChange={handleChange}/>
       
        <button
        disabled={loading}
         
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
        {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OthComponents/>
      </form>
      
   
      <div className='flex gap-6 mt-5'>
      <p>Have acconte </p>
      <Link to={"/signup"}> <span>sIGNUP</span></Link>

      </div>
    
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
 
}

export default Signin