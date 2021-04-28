import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormButton, FormContent, FormH1, FormInput, FormLabel, FormWrap , Text , Icon, Container} from './SigninElements';

import { createNewUser } from '../../actions/authAction';
import Loader from '../Loader/Loader';

const SignIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const authenticationState = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    const formSubmitHandler = event => {
        event.preventDefault();

        dispatch(createNewUser(email, password));
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
                                <FormLabel htmlFor='for'>Password</FormLabel>
                                <FormInput type='password' required value = {password} onChange = {(event) => setPassword(event.target.value)}/>
                                <FormButton type='submit'>Continue</FormButton>
                                <Text>Forgot password</Text>
                            </Form>
                        </FormContent>
                        </FormWrap>
                    </Container>
                </>
            );
        }
}

export default SignIn
