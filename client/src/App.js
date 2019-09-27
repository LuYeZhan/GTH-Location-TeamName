import React, {Component} from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';

import PrivateRoute from './components/routes/PrivateRoute.js';
import AnonRoute from './components/routes/AnonRoute.js';

import Private from './pages/Private';
import Signup from './pages/signup';
import Login from './pages/login';
import Menu from './components/ui/menu'
import AuthProvider from './contexts/auth-context.js';

import './App.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <AuthProvider>
          <div className="container">
            <Switch>
            <AnonRoute
              exact
              path="/signup"
              render={(props)=> <> <Menu/> <Signup {...props}/> </>} />
            <AnonRoute
              exact
              path="/login"
              render={(props)=> <Login {...props}/>} />
            <PrivateRoute
              exact
              path="/private"
              render={(props)=> <Private {...props}/>} />
            </Switch>
          </div>
        </AuthProvider>
      </Router>
    )
  }
}

export default App;