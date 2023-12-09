import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import SmallSpinner from '../Components/Spinner/SmallSpinner';

const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext)
    const location = useLocation()

    if(loading){
        return <SmallSpinner></SmallSpinner>
    }

    if(user){
        return children
    }
    <Navigate to='/signup' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;