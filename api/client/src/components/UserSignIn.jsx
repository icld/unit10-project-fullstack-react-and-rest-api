import { useContext, useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Context } from '../Context/Context';

const UserSignIn = () => {
  const history = useHistory();
  let location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  //state
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const { actions } = useContext(Context);

  //validates form fields before signing in.  returns user to previous or intended page (if rerouted to sign in)
  const handleSubmit = () => {
    if (!password && !emailAddress) {
      setErrors('Please Sign in!');
    } else if (!password) {
      setErrors('Please enter a password');
    } else if (!emailAddress) {
      setErrors('Please enter your email address');
    } else {
      actions
        .signIn(emailAddress, password)
        .then((res) => {
          if (!res) {
            setErrors('Sign-in was unsuccessful');
          } else {
            if (!location.state) {
              history.goBack();
            } else {
              history.push(from);
              return null;
            }
          }
        })
        .catch((err) => {
          console.error(err);
          history.push('/error');
        });
    }
  };

  return (
    <main>
      <div className='form--centered'>
        <h2>Sign In</h2>
        {errors.length ? (
          <div className='validation--errors'>
            <h3>Validation Errors</h3>
            <ul>
              <li>{errors}</li>
            </ul>
          </div>
        ) : null}

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <label htmlFor='emailAddress'>Email Address</label>
          <input
            id='emailAddress'
            name='emailAddress'
            type='email'
            value={emailAddress}
            onChange={(e) => {
              setEmailAddress(e.target.value);
            }}
          />
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className='button' type='submit'>
            Sign In
          </button>
          <button
            className='button button-secondary'
            onClick={(event) => {
              event.preventDefault();
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
