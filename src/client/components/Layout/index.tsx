import React, { FC } from 'react';
import { User } from '../../../server/common/types/user';
import { Container } from '../Container';
import { Navbar } from '../Navbar';

interface Props {
  user: User;
}

export const Layout: FC<Props> = ({ user, children }) => {
  return (
    <>
      <Navbar user={user}/>
      <Container>{children}</Container>
    </>
  );
};
