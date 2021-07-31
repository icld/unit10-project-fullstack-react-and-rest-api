import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../Context/Context';

const UserSignOut = () => {
  const { actions } = useContext(Context);
  actions.signOut();
  return <Redirect to='/' />;
};

export default UserSignOut;
