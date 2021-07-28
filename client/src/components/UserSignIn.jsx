import { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../Context/Context';
import Modal from '../components/Modal';

const UserSignIn = (props) => {
  const history = useHistory();
  // const { from } = history.location.state || {
  //   from: { pathname: '/authenticated' },
  // };

  const [emailAddress, setEmailAddress] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);

  const { actions, authenticatedUser } = useContext(Context);

  if (authenticatedUser) {
    console.log(`authneticated user is ${authenticatedUser[0].firstName}`);
  }

  const handleSubmit = () => {
    if (!password && !emailAddress) {
      setErrors((errors) => ['Please Sign in!']);
    } else if (!password) {
      setErrors((errors) => ['Please enter a password']);
    } else if (!emailAddress) {
      setErrors((errors) => ['Please enter your email address']);
    } else {
      actions
        .signIn(emailAddress, password)
        .then((res) => {
          if (!res) {
            setErrors('Sign-in was unsuccessful');
          } else {
            // toggleModal();
            history.goBack();
            // return null;
          }
        })
        .catch((err) => {
          console.error(err);
          history.push('/error');
        });
    }
  };

  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    console.log(`password is ${password}, emailAddress is ${emailAddress}`);
  }, [password, emailAddress]);

  return (
    <main>
      <div className='form--centered'>
        <h2>Sign In</h2>
        {errors.length ? (
          <div className='validation--errors'>
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error) => (
                <li>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}

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
      {/* {showModal && authenticatedUser ? (
        <Modal>
          <div className='bounds'>
            <div className='grid-100'>
              <h1>You have been successfully logged in!</h1>
              <p>Your username is {authenticatedUser[0].emailAddress}.</p>
            </div>
            <button onClick={() => history.push('/')}>
              Check out some courses
            </button>
          </div>
        </Modal>
      ) : null} */}
    </main>
  );
};
export default UserSignIn;
