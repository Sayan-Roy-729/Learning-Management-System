import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import sweetAlert from 'sweetalert2';

import './App.css';
import Home from './pages';
import SigninPage from './pages/signin';
import CoursePage from './pages/course';
import SignUpForm from './pages/signup';
import OrderPage from './pages/order';
import DashboardPage from './pages/dashboard';
import { currentSignInUser } from './actions/authAction';
import { getEnrolledCourses } from './actions/courseAction';

function App(props) {
    const authState = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(currentSignInUser());
    }, [dispatch]);

    useEffect(() => {
        if (authState.user) {
            dispatch(getEnrolledCourses(authState.user['email']));
        }
    });

    return (
        <Router>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/signin" component={SigninPage} exact />
                <Route path="/signup" component={SignUpForm} />
                {authState.user && (
                    <>
                        <Route path="/dashboard" component={DashboardPage} />
                        <Route
                            path="/course/:id"
                            component={CoursePage}
                            exact
                        />
                        <Route path="/order/:id" component={OrderPage} />
                    </>
                )}
            </Switch>
        </Router>
    );
}

export default App;
