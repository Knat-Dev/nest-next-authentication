import { NextPage } from 'next';
import React from 'react';

const LoginPage: NextPage = () => {
  return <div><button onClick={()=>{window.location.href = "/api/v1/auth"}}>Login with Google</button></div>;
};

export default LoginPage;
