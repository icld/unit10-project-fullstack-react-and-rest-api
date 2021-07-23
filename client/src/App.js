import { useState, useEffect, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  NavLink,
} from 'react-router-dom';
// import axios from 'axios';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
// import config from './config';

function App() {
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
