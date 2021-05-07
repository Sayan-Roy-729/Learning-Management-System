import React, { useEffect } from 'react';
import {BrowserRouter as Router, Switch , Route} from 'react-router-dom'
import { useDispatch } from 'react-redux';

import './App.css';
import Home from './pages';
import SigninPage from './pages/signin';
import { currentSignInUser } from './actions/authAction';
import CoursePage from './pages/course';
import SignUpForm from './pages/signup';
import OrderPage from './pages/order';
import DashboardPage from './pages/dashboard';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentSignInUser());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/signin" component={SigninPage} exact/>
        <Route path = '/signup' component = {SignUpForm}/>
        <Route path = '/dashboard' component = {DashboardPage}/>
        <Route path = '/course/:id' component = {CoursePage} exact />
        <Route path = '/order/:id' component = {OrderPage} />
      </Switch>
    </Router>
  );
}

export default App;
