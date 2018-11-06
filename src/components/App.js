import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Dashboard from './dashboard/Dashboard';
import SignIn from './auth/SignIn';
import Welcome from './layout/Welcome';
import '../style/App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/dashboard' component={Dashboard}/>
            <Route path='/signin' component={SignIn} />
            <Route path='/welcome' component={Welcome} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
