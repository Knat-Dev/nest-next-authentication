import Head from 'next/head';
import React, { FC } from 'react';
import { User } from '../../../server/common/types/user';
import { Container } from '../Container';
import { Navbar } from '../Navbar';

interface Props {
  user: User;
  pageTitle: string;
}

export const Layout: FC<Props> = ({ user, pageTitle, children }) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Navbar user={user} />
      <Container>{children}</Container>
    </>
  );
};
