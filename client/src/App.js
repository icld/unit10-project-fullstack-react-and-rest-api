/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import NotFound from './components/NotFound';
import Error from './components/Error';
import Authenticated from './components/Authenticated';

function App(props) {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={Courses} />
          <Route path='/courses/:id' component={CourseDetail} />
          <Route path='/signin' component={UserSignIn} />
          <Route path='/error' component={Error} />
          <Route path='/authenticated' component={Authenticated} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
