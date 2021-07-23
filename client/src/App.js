import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  NavLink,
} from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
// import config from './config';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/courses')
      .then((response) => setData(response.data))
      .catch((error) => console.log('Error fetching and parsing data', error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div className='App'>
        <Header />
        <Switch>
          <Route path='/courses/:id' component={CourseDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
