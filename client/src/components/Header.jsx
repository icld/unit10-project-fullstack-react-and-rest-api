import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context/Context';
const Header = () => {
  const { authenticatedUser } = useContext(Context);
  return (
    <header>
      <div className='wrap header--flex'>
        <h1 className='header--logo'>
          <Link to='/'>Courses</Link>
        </h1>
        <nav>
          <ul className='header--signedin'>
            <li>Welcome, {authenticatedUser[0].firstName}!</li>
            <li>
              <a href='sign-out.html'>Sign Out</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
