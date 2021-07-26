/* eslint-disable import/no-anonymous-default-export */
import React, { useContext } from 'react';
import { Context } from '../Context/Context';

const Authenticated = () => {
  const { authenticatedUser } = useContext(Context);
  console.log(authenticatedUser[0].id);
  const authUser = authenticatedUser[0];
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
