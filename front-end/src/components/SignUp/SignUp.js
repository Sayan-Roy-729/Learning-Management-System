import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { createNewUser, googleSignIn } from '../../actions/authAction';
import Loader from '../Loader/Loader';
import './SignUp.css';

const SignUp = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const dispatch = useDispatch();
    const authState = useSelector((state) => state.authReducer);

    const signInHandler = (event) => {
        event.preventDefault();

        dispatch(createNewUser(email, password));
    };

    useEffect(() => {
        if (authState.user) {
            history.replace('/');
        }
    });

    const googleSignInHandler = () => {
        dispatch(googleSignIn());
    };

    if (authState.loading) {
        return <Loader />;
    } else {
        return (
            <div className="FormCenter" style={{ marginTop: '50px' }}>
                <form
                    onSubmit={(event) => signInHandler(event)}
                    className="FormFields"
                >
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="email">
                            E-Mail Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="FormField__Input"
                            placeholder="Enter your email"
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="FormField__Input"
                            placeholder="Enter your password"
                            name="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                    </div>

                    <div className="FormField">
                        <button
                            className="FormField__Button mr-20"
                            type="submit"
                            onClick={(event) => signInHandler(event)}
                        >
                            Sign Up
                        </button>
                        <span style={{ margin: '0 5px' }}>OR</span>
                        <button className="FormField__Button mr-20" onClick = {googleSignInHandler}>
                            SignIn with Google
                        </button>
                        {/*<Link to="/sign-in" className="FormField__Link">I'm already member</Link>*/}
                    </div>
                </form>
            </div>
        );
    }
};

export default SignUp;
