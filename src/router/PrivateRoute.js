import React, { useContext } from 'react';
import { AuthContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext);

    if(loading){
        return  <Spinner  animation="border" variant="success" />
    }

    if(user && user.uid){
        return children;
    }
    return <Navigate to='/login'></Navigate>
};

export default PrivateRoute;