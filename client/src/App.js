import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import NotFound from './components/NotFound';
import UnhandledError from './components/UnhandledError';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Forbidden from './components/Forbidden';
import UserSignOut from './components/UserSignOut';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={Courses} />
          <PrivateRoute path='/courses/:id/update' component={UpdateCourse} />
          <PrivateRoute path='/courses/create' component={CreateCourse} />
          <Route path='/courses/:id' component={CourseDetail} />

          <Route path='/signin' component={UserSignIn} />
          <Route path='/signup' component={UserSignUp} />
          <Route path='/signout' component={UserSignOut} />

          <Route path='/error' component={UnhandledError} />
          <Route path='/forbidden' component={Forbidden} />
          <Route path='/notfound' component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
