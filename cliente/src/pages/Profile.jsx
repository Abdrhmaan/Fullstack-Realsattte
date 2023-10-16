
import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import { useRef } from 'react'
import { updateUserStart,updateUserFailure, updateUserSuccess ,deleteUserStart,deleteUserFailure,deleteUserSuccess, signInSuccess, signInStart, signInFailure} from '../redux/user/userslice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { app } from '../firbase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { Navigate, useNavigate } from 'react-router-dom';


const Profile = () => {
  const {currentUser,loading,error
  } =  useSelector((Sstate) => Sstate.user)

  console.log(currentUser)
  const navigator = useNavigate()

  const dispach = useDispatch()
  const fileref  = useRef(null)
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);


  useEffect(()=> {
    if(file){
      handlefileupload(file)
    }

  },[file])

  const  handlefileupload = (file)=> {
    const storage  = getStorage(app)
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
   
    
    );
    
  
    
  }

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData)



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispach(updateUserStart());
  
      const res = await fetch(`/api/user/update/${currentUser._id

      }`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispach(updateUserFailure(data.message));
      
        return;
      }

      dispach(updateUserSuccess(data));
  
      setUpdateSuccess(true);
   
    } catch (error) {
      console.log(error)
    }
  };

  const handleedeleted = async() => {
    try {
      dispach(deleteUserStart());
  
      const res = await fetch(`/api/user/delete/${currentUser._id

      }`, {
        method: 'DELETE',
       
       
      });
      const data = await res.json();
      if (data.success === false) {
        dispach(updateUserFailure(data.message));
        dispach(deleteUserFailure(data))
      
        return;
      }

      dispach(deleteUserSuccess(data))
   
       console.log(data)
   
    } catch (error) {
      console.log(error)
    }
    

  }


  const handlesignout = async()=>  {
    try {

      dispach(signInStart())
  
      const res = await fetch('/api/authentcation/signou'

      , {
        method: 'GET',
       
       
      });
      const data = await res.json();
      if (data.success === false) {
        dispach(signInFailure(data))

      
        return;
      }

      dispach(signInSuccess(data))
      navigator("/sigin")
   
       console.log(data)
   
    } catch (error) {
      console.log(error)
    }


  }


  const handleshow = async()=> {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
    console.log(userListings)

  }


  const handleListingDelete  = async(listingId)=> {
    try {
      const res = await fetch(`/api/user/delletd/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
      prev.filter((listing) => listing._id !== listingId)
    );
     
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className='max-w-lg mx-auto p-3'>
    <h1 className='text-center  mt-20 font-semibold text-3xl' > Profile</h1>
    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
      <input type='file' ref={fileref} className='  hidden' onChange={(e) => setFile(e.target.files[0])}/>
      <img onClick={()=> fileref.current.click()} src= { formData.avatar || currentUser.avatar} className='h-24 w-24  rounded-full  object-cover self-center mt-3'/>
      <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
      <input type='text' defaultValue={currentUser.username} placeholder='name' className='p-3 border rounded-lg'  id='username'       onChange={handleChange} />
      <input type='text' defaultValue={currentUser.email} placeholder='email' className='p-3 border rounded-lg'   id='email'      onChange={handleChange} />
      <input type='text' placeholder='passsowrd'  className='p-4 border rounded-lg' id='password'onChange={handleChange}/>
      <button className='bg-slate-700 text-white p-4 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>   {loading ? 'Loading...' : 'Update'}</button>
      <Link
          className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
          to={'/createlisting'}
        >
          Create Listing
        </Link>
    </form>
    <div className='flex justify-between mt-4'>
      <span className='text-red-700 rounde' onClick={handleedeleted}>Delet Aconte</span>
      <span className='text-red-700 rounde' onClick={handlesignout}>Signout</span>
    </div>
    <p> {error ? error : ""}</p>
    <p> {updateSuccess ? "user is updated succefuly" : ""}</p>
    <button  onClick={handleshow}   className='text-green-700 w-full'>
        Show Listings
      </button>
      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>
      
      {userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button  onClick={() => handleListingDelete(listing._id)}
                 
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                <Link to={`/update/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Profile