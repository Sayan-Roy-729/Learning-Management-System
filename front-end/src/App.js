import React, { useEffect } from 'react';
import {BrowserRouter as Router, Switch , Route} from 'react-router-dom'
import { useDispatch } from 'react-redux';

import './App.css';
import Home from './pages';
import SigninPage from './pages/signin';
import { currentSignInUser } from './actions/authAction';

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
      </Switch>
    </Router>
  );
}

export default App;
