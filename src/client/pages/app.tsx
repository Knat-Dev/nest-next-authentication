import { NextPage } from 'next';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../app/slices/authSlice';
import { Layout } from '../components';

const Home: NextPage<{ data: string }> = (props) => {
  const user = useSelector(selectCurrentUser);

  return <Layout user={user}>hi, this is the home page</Layout>;
};

// export const getStaticProps: GetStaticProps = async (context) => {
//   console.log(context)
//   return {
//     props: { data: JSON.stringify({ message: 'hello world' }) },
//   };
// };

Home.getInitialProps = ({ query }) => {
  return {
    data: `some initial props including query params and controller data: ${JSON.stringify(
      query,
    )}`,
  };
};

export default Home;
