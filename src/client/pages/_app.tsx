import { ChakraProvider } from '@chakra-ui/react';
import 'isomorphic-fetch';
import App, { AppContext } from 'next/app';
import React from 'react';
import { fetchMe } from '../app/slices/authSlice';
import { wrapper } from '../app/store';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (state) => async (appContext: AppContext) => {
    const { req } = appContext.ctx;
    if(req){
      const headers = req.headers;
      if (headers) await state.dispatch(fetchMe({ headers }));
    }

    const appProps = await App.getInitialProps(appContext);
    return { ...appProps };
  },
);

export default wrapper.withRedux(MyApp);
