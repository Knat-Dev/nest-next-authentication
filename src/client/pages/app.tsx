import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { User } from '../../server/common/types/user';
import { wrapper } from '../app/store';
import { Layout } from '../components';

const Home: NextPage<{ user: User }> = ({ user }) => {
  return <Layout pageTitle="Home" user={user}>hi, this is the home page</Layout>;
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

export default Home;
