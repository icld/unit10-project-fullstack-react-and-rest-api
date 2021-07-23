import { useState, useEffect } from 'react';
import axios from 'axios';

// import config from './config';

// import './App.css';

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
    <div className='App'>
      <header className='App-header'>
        {data.map((item) => (
          <h1>{item.title}</h1>
        ))}
      </header>
    </div>
  );
}

export default App;
