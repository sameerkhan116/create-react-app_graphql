import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Auth from './Auth';
import Login from './Login';
import Register from './Register';

export default() => (
  <Router>
    <Switch>
      <Route exact path="/auth" render={props => <Auth {...props}/>}/>
      <Route exact path="/login" render={props => <Login {...props}/>}/>
      <Route exact path="/register" render={props => <Register {...props}/>}/>
    </Switch>
  </Router>
)