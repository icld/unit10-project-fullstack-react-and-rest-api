import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className='wrap header--flex'>
        <h1 className='header--logo'>
          <Link to='index.html'>Courses</Link>
        </h1>
        <nav>
          <ul className='header--signedin'>
            <li>Welcome, Joe Smith!</li>
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
