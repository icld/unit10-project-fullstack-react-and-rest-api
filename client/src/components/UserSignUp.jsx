import { set } from 'js-cookie';
import { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Context } from '../Context/Context';

const UserSignUp = () => {
  const { data, actions } = useContext(Context);
  let history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPass] = useState('');
  const [confirmPassword, setConfirmPass] = useState('');
  const [errors, setErrors] = useState([]);

  console.log(firstName, lastName, emailAddress, password, confirmPassword);

  const handleSubmit = () => {
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    if (password === confirmPassword) {
      data
        .createUser(user)
        .then((errors) => {
          if (errors.length) {
            setErrors(errors);
          } else {
            actions.signIn(emailAddress, password).then(() => {
              history.push('/authenticated');
            });
          }
        })
        .catch((err) => {
          console.log(err);
          //history.push('/error')
        });
    } else {
      setErrors(['passwords must match']);
      console.log(errors);
    }
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
      <div class='form--centered'>
        <h2>Sign Up</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <label for='firstName'>First Name</label>
          <input
            id='firstName'
            name='firstName'
            type='text'
            value={firstName}
            onChange={change}
          />
          <label for='lastName'>Last Name</label>
          <input
            id='lastName'
            name='lastName'
            type='text'
            value={lastName}
            onChange={change}
          />
          <label for='emailAddress'>Email Address</label>
          <input
            id='emailAddress'
            name='emailAddress'
            type='email'
            value={emailAddress}
            onChange={change}
          />
          <label for='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            value={password}
            onChange={change}
          />
          <label for='confirmPassword'>Confirm Password</label>
          <input
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            value={confirmPassword}
            onChange={change}
          />
          <button class='button' type='submit'>
            Sign Up
          </button>
          <button
            class='button button-secondary'
            onclick={(e) => {
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
