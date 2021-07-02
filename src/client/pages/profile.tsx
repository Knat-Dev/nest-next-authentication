import { NextPage } from 'next';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../app/slices/authSlice';
import { Layout } from '../components/';

const Profile: NextPage = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <Layout user={user}>
      <h1>{user.id}</h1>
      <h1>{user.provider}</h1>
      <h1>{user.username}</h1>
    </Layout>
  );
};

export default Profile;
