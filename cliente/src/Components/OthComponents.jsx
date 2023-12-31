import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';


import { app } from '../firbase';
import { signInSuccess } from '../redux/user/userslice';

export default function OthComponents() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result)


      const res = await fetch('/api/authentcation/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user
          .displayName,
          email: result.user.email,
          photo: result.user.photoURL
          ,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/")

      console.log(data)
   
    } catch (error) {
      console.log('could not sign in with google', error);
    }
    
   
  };
  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
    >
      Continue with google
    </button>
  );
}