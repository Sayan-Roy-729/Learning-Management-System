import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

import SignIn from '../components/Signin'

const SigninPage = (props) => {
    const authenticationState = useSelector(state => state.authReducer);

    useEffect(() => {
        if (authenticationState.user) {
            props.history.replace('/');
        }
    });

    return (
        <>
         <SignIn/>  
        </>
    );
};

export default SigninPage;
