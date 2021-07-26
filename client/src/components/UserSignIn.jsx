import { Link, useHistory } from 'react-router-dom';

const UserSignIn = () => {
  const history = useHistory();

  const [username, setUserName]

  return (
    <main>
      <div class='form--centered'>
        <h2>Sign In</h2>

        <form>
          <label for='emailAddress'>Email Address</label>
          <input id='emailAddress' name='emailAddress' type='email' value='' />
          <label for='password'>Password</label>
          <input id='password' name='password' type='password' value='' />
          <button className='button' type='submit'>
            Sign In
          </button>
          <button
            class='button button-secondary'
            onClick={(event) => {
              // event.preventDefault();
              history.push('/');
            }}
          >
            Cancel
          </button>
        </form>
        <p>
          Don't have a user account? Click here to{' '}
          <Link to='/signup'>sign up</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignIn;
