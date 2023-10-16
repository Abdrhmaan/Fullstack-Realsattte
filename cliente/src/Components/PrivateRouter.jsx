import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import React from 'react'

const PrivateRouter = () => {
 
    const { currentUser } = useSelector((state) => state.user);
    console.log(currentUser)
    return currentUser ? <Outlet /> : <Navigate to='/sigin' />;

}

export default PrivateRouter