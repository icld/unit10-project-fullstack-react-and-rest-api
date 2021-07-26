import { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context/Context';

const UserSignIn = (props) => {
  const history = useHistory();
  const { from } = history.location.state || {
    from: { pathname: '/authenticated' },
  };

  const [emailAddress, setEmailAddress] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState([]);
  const { actions, authenticatedUser } = useContext(Context);

  if (authenticatedUser) {
    console.log(`authneticated user is ${authenticatedUser[0].firstName}`);
  }

  const handleSubmit = () => {
    actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          setErrors('Sign-in was unsuccsessful');
        } else {
          history.push(from);
          // return null;
        }
      })
      .catch((error) => {
        console.error(error);
        // history.push('/error');
      });
  };

  function ErrorsDisplay(errors) {
    let errorsDisplay = null;

    if (errors.length) {
      errorsDisplay = (
        <div>
          <h2 className='validation--errors--label'>Validation errors</h2>
          <div className='validation-errors'>
            <ul>
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      );
      return errorsDisplay;
    }
  }

  useEffect(() => {
    console.log(`password is ${password}, emailAddress is ${emailAddress}`);
  }, [password, emailAddress]);

  return (
    <main>
      {errors.length > 0 ? <ErrorsDisplay errors={errors} /> : null}
      <div className='form--centered'>
        <h2>Sign In</h2>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <label for='emailAddress'>Email Address</label>
          <input
            id='emailAddress'
            name='emailAddress'
            type='email'
            value={emailAddress}
            onChange={(e) => {
              setEmailAddress(e.target.value);
            }}
          />
          <label for='password'>Password</label>
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
