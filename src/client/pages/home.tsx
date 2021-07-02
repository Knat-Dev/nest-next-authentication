import { NextPage } from 'next';
import React from 'react';

const Home: NextPage<{ data: string }> = (props) => {
  const { data } = props;

  return (
    <div>
      <h1>Hello from NextJS! - Home</h1>
      {data}
    </div>
  );
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
