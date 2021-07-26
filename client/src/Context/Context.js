import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Data from '../Data/Data';

export const Context = React.createContext();

export const Provider = (props) => {
  const data = new Data();
  const [authenticatedUser, setAuthenticatedUser] = useState(
    Cookies.getJSON('authenticatedUser') || null
  );

  const [userPassword, setUserPassword] = useState(
    Cookies.getJSON('userPassword') || null
  );
  const signIn = async (username, password) => {
    const user = await data.getUser(username, password);
    if (user !== null) {
      setAuthenticatedUser(user);
      setAuthenticatedUser(password);

      const cookieOptions = {
        expires: 1, // 1 day
      };
      Cookies.set('authenticatedUser', JSON.stringify(user), { cookieOptions });
      Cookies.set('userPassword', JSON.stringify(password), { cookieOptions });
    }
    return user;
  };

  const signOut = () => {
    setAuthenticatedUser(null);
    setUserPassword(null);
    Cookies.remove('authenticatedUser');
    Cookies.remove('userPassword');
  };

  const value = {
    authenticatedUser,
    data,
    userPassword,
    actions: {
      signIn: signIn,
      signOut: signOut,
    },
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}

export default { withContext, Context };
