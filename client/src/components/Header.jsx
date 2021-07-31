import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context/Context';

const Header = () => {
  const { authenticatedUser, actions } = useContext(Context);
  return (
    <header>
      <div className='wrap header--flex'>
        <h1 className='header--logo'>
          <Link to='/'>Courses</Link>
        </h1>
        <nav>
          <ul className='header--signedin'>
            {authenticatedUser ? (
              <>
                <li style={{ textTransform: 'capitalize' }}>
                  Welcome, {authenticatedUser[0].firstName}!
                </li>
                <li>
                  <Link to='/signout'>Sign Out</Link>
                </li>
              </>
            ) : (
              <>
                <li>Welcome!</li>
                <li>
                  <Link to='/signin'>Sign in</Link>
                </li>
                <li>
                  <Link to='/signup'>Sign up</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
