import { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../Context/Context';

// signs out the authenticated user, and redirects to the 'home' route
const UserSignOut = () => {
  const { actions } = useContext(Context);

  useEffect(() => {
    actions.signOut();
  });

  return <Redirect to='/' />;
};

export default UserSignOut;
