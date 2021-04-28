import React from 'react'
import SignIn from '../components/Signin'

const SigninPage = (props) => {
    return (
        <>
         <SignIn user = {props.user}/>  
        </>
    );
};

export default SigninPage;
