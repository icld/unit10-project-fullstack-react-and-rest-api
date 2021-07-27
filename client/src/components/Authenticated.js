/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Context } from '../Context/Context';

const Authenticated = () => {
  const { authenticatedUser } = useContext(Context);
  console.log(authenticatedUser[0].id);
  const authUser = authenticatedUser[0];
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => history.push('/'), [3000]);
  });

  return (
    <div className='bounds'>
      <div className='grid-100'>
        <h1>{authUser.firstName} is authenticated!</h1>
        <p>Your username is {authUser.username}.</p>
      </div>
    </div>
  );
};

export default Authenticated;
