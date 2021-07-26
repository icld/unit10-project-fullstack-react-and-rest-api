import { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { Context } from '../Context/Context';

const UserSignUp = () => {
  const { data, actions } = useContext(Context.Context);
  let history = useHistory();

  const [name, setName] = useState('');
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const [errors, setErrors] = useState([]);
  const change = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case 'name':
        setName(value);
        break;
      case 'username':
        setUser(value);
        break;
      case 'password':
        setPass(value);
        break;
      default:
        return;
    }
  };
  return (
    <main>
      <div class='form--centered'>
        <h2>Sign Up</h2>

        <form>
          <label for='firstName'>First Name</label>
          <input id='firstName' name='firstName' type='text' value='' />
          <label for='lastName'>Last Name</label>
          <input id='lastName' name='lastName' type='text' value='' />
          <label for='emailAddress'>Email Address</label>
          <input id='emailAddress' name='emailAddress' type='email' value='' />
          <label for='password'>Password</label>
          <input id='password' name='password' type='password' value='' />
          <label for='confirmPassword'>Confirm Password</label>
          <input
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            value=''
          />
          <button class='button' type='submit'>
            Sign Up
          </button>
          <button
            class='button button-secondary'
            onclick="event.preventDefault(); location.href='index.html';"
          >
            Cancel
          </button>
        </form>
        <p>
          Already have a user account? Click here to{' '}
          <a href='sign-in.html'>sign in</a>!
        </p>
      </div>
    </main>
  );
};

export default UserSignUp;
