import { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Context } from '../Context/Context';

const UserSignUp = () => {
  const { data, actions } = useContext(Context);
  const history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPass] = useState('');
  const [confirmPassword, setConfirmPass] = useState('');
  const [errors, setErrors] = useState([]);

  //text log
  // console.log(firstName, lastName, emailAddress, password, confirmPassword);

  const handleSubmit = () => {
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    };

    data
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          // test errors
          console.log(errors);
          setErrors(errors);
        } else {
          actions.signIn(emailAddress, password).then(() => {
            history.goBack();
          });
        }
      })
      .catch((err) => {
        console.log(err);
        history.push('/error');
      });
  };

  const change = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'emailAddress':
        setEmailAddress(value);
        break;
      case 'password':
        setPass(value);
        break;
      case 'confirmPassword':
        setConfirmPass(value);
        break;
      default:
        return;
    }
  };
  return (
    <main>
      <div className='form--centered'>
        <h2>Sign Up</h2>
        {errors.length ? (
          <div className='validation--errors'>
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <label htmlFor='firstName'>First Name</label>
          <input
            id='firstName'
            name='firstName'
            type='text'
            value={firstName}
            onChange={change}
          />
          <label htmlFor='lastName'>Last Name</label>
          <input
            id='lastName'
            name='lastName'
            type='text'
            value={lastName}
            onChange={change}
          />
          <label htmlFor='emailAddress'>Email Address</label>
          <input
            id='emailAddress'
            name='emailAddress'
            type='email'
            value={emailAddress}
            onChange={change}
          />
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            value={password}
            onChange={change}
          />
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            value={confirmPassword}
            onChange={change}
          />
          <button className='button' type='submit'>
            Sign Up
          </button>
          <button
            className='button button-secondary'
            onClick={(e) => {
              history.push('/');
            }}
          >
            Cancel
          </button>
        </form>
        <p>
          Already have a user account? Click here to{' '}
          <Link to='/signin'>sign in</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignUp;
