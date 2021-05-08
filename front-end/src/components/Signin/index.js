import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { Form, FormButton, FormContent, FormH1, FormInput, FormLabel, FormWrap , Text , Icon, Container} from './SigninElements';
import { signInUser, clearErrorMessage, userResetPassword, clearSentEmail, googleSignIn } from '../../actions/authAction';
import Loader from '../Loader/Loader';

const SignIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [forgotPassword, setForgotPassword] = useState(false);

    // ? Access the routing details
    const history = useHistory();

    // ? Access the redux
    const authenticationState = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    // ? If any error occurred during the sign in/reset password process, show alert
    useEffect(() => {
        if (authenticationState.sendMail && authenticationState.errorMessage) {
            showAlertDialogBox(
                'Failed to send an email',
                authenticationState.errorMessage,
                'error',
                'red',                
            );
            
            // After displaying the error dialog, clear from the global state
            dispatch(clearSentEmail());
        } else if (authenticationState.errorMessage) {
            showAlertDialogBox(
                'SignIn Failed!',
                authenticationState.errorMessage,
                'error',
                'red',
            );

            //After displaying the error message, clear the error message state
            dispatch(clearErrorMessage());
        }
    }, [authenticationState.errorMessage, dispatch, authenticationState.sendMail]);

    // ? Show email sent dialog box to reset password
    useEffect(() => {
        if (authenticationState.sendMail) {
            showAlertDialogBox(
                'Email Send',
                'An email is send to the email address. Please reset your password from the email',
                'success',
                'green',
            );
        }
        // After displaying the info message, clear the sent mail state
        dispatch(clearSentEmail());
    }, [authenticationState.sendMail, dispatch]);

    // ? After successful sign in, redirect to home page
    useEffect(() => {
        if (authenticationState.user) {
            history.replace('/');
        }
    }); 


    // ? Alert dialog box
    const showAlertDialogBox = (title, text, icon, buttonColor) => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: 'OK',
            confirmButtonColor: buttonColor,
        });
    };

    // ? Sign in Handler
    const formSubmitHandler = event => {
        event.preventDefault();
        if (!forgotPassword) {
            // Dispatch for sign in
            dispatch(signInUser(email, password));
        } else {
            // Dispatch for forgot password
            dispatch(userResetPassword(email));
        }
    };

    //? Google Sign In
    const googleSignInHandler = () => {
        dispatch(googleSignIn());
    };
    
    if (authenticationState.loading) {
        return <Loader />;
    } else {
        return (
            <>
                <Container>
                    <FormWrap>
                        <Icon to='/'>CampusX</Icon>
                    <FormContent>
                        <Form action='#' onSubmit = {event => formSubmitHandler(event)}>
                            <FormH1>Sign in to your account</FormH1>
                            <FormLabel htmlFor='for'>Email</FormLabel>
                            <FormInput type='email' required value = {email} onChange = {(event) => setEmail(event.target.value)}/>
                            {
                                !forgotPassword && (
                                    <>
                                        <FormLabel htmlFor='for'>Password</FormLabel>
                                        <FormInput type='password' required value = {password} onChange = {(event) => setPassword(event.target.value)}/>
                                    </>
                                )
                            }
                            <FormButton type='submit'>Continue</FormButton>
                            {
                                forgotPassword ? (
                                    <Text onClick = {() => setForgotPassword(false)}>Return SignIn Page</Text>
                                ) : (
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <Text onClick = {() => setForgotPassword(true)} style={{cursor: 'pointer'}}>Forgot password</Text>
                                        <Text>OR</Text>
                                        <Text style={{cursor: 'pointer'}} onClick = {googleSignInHandler}>Google SignIn</Text>
                                    </div>
                                )
                            }
                        </Form>
                    </FormContent>
                    </FormWrap>
                </Container>
            </>
        );
    }
}

export default SignIn
