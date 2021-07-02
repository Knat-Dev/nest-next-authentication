import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { User } from '../../server/common/types/user';
import { wrapper } from '../app/store';
import { Layout } from '../components/';

const Profile: NextPage<{ user: User }> = ({ user }) => {
  return (
    <Layout pageTitle="Profile" user={user}>
      <h1>{user.id}</h1>
      <h1>{user.provider}</h1>
      <h1>{user.username}</h1>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (state) => async (context) => {
    const user = state.getState().auth.user;

    if (!state.getState().auth.user)
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    else
      return {
        props: { user },
      };
  },
);

export default Profile;
