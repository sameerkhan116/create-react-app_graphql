import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import decode from 'jwt-decode';

import Auth from './Auth';
import Login from './Login';
import Register from './Register';

const checkAuth = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  if(!token || !refreshToken) {
    return false;
  }

  try {
    const {exp} = decode(refreshToken);
    if(exp < new Date().getTime() / 1000) {
      return false;
    }
  }
  catch(e) {
    console.log(e);
    return false;
  }
  return true;
}

const AuthRoute = ({ component: Component, ...rest }) => (  
  <Route
    {...rest}
    render={props =>
      checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{pathname: "/login"}}
        />
      )
    }
  />
)

export default() => (
  <Router>
    <Switch>
      <AuthRoute exact path="/auth" component={Auth}/>
      <Route exact path="/login" render={props => <Login {...props}/>}/>
      <Route exact path="/register" render={props => <Register {...props}/>}/>
    </Switch>
  </Router>
)