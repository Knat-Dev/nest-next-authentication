import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { User } from '../../server/common/types/user';

const Profile: NextPage<{ user: string }> = ({ user }) => {
  const currUser = JSON.parse(user) as User;
  return (
    <div>
      <h1>{currUser.id}</h1>
      <h1>{currUser.provider}</h1>
      <h1>{currUser.username}</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = context.query.user;
  return {
    props: {
      user: JSON.stringify(user),
    },
  };
};

// Profile.getInitialProps = ({ query }): { user: User } => {
//   return { user: query.user as unknown as User};
// };

export default Profile;
