/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  NavLink,
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
// import config from './config';

function App(props) {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={Courses} />
          <Route path='/courses/:id' component={CourseDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
