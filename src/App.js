import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Patient from './components/Patient';

function Welcome(props) {
  return <h1> Hi, {props.name} </h1>;
}
const introtext = <h1> Testing pracs for Week 11. </h1>;
function myApp() {
  return (
    <div className="App">
      <div className="menu">
        <ul>
          <li> <Link to="/">Home</Link> </li>
          <li> <Link to="/about">About</Link> </li>
          <li> <Link to="/patient">Patient</Link> </li>
        </ul>
      </div>
      <div className="App-intro">
        <Switch>
          <Route exact path ="/" component={Home} />
          <Route path ="/about" component={About} />
          <Route path ="/patient" component={Patient} />
          <Route component={Home} />
        </Switch>
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Welcome name="Daniel" />
        {introtext}
      </header>
    </div>
  );
}

export default myApp;
