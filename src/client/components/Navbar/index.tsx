import { Box, Button, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';
import React, { FC, useState } from 'react';
import { RiAddFill, RiProfileLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { User } from '../../../server/common/types/user';
import { logout } from '../../app/slices/authSlice';
import { AppDispatch } from '../../app/store';
import { UserRole } from '../../types.d';
import { Container } from '../Container';
import { NavbarIconButton } from '../NavbarIconButton';

interface Props {
  user: User | null;
}

export const Navbar: FC<Props> = ({ user }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await dispatch(logout({ router }));
  };

  return (
    <>
      <Flex color="white" bg="purple.700" h="48px" p={4} align="center">
        <Container>
          <Flex mx="auto" w="1000px" justify="space-between">
            <NextLink href="/app">
              <a>App Name</a>
            </NextLink>
            <Box>
              {user ? (
                <Flex gridGap={2} align="center">
                  {user.role === UserRole.Admin && (
                    <NavbarIconButton
                      tooltipLabel="Create a new post.."
                      icon={<RiAddFill />}
                    />
                  )}
                  <NextLink href="/profile">
                    <a>
                      <NavbarIconButton
                        tooltipLabel="User Profile"
                        icon={<RiProfileLine />}
                      />
                    </a>
                  </NextLink>
                  <Button
                    size="xs"
                    variant="outline"
                    background="purple.700"
                    _hover={{ color: 'purple.700', background: 'white' }}
                    onClick={handleLogout}
                    isLoading={isLoggingOut}
                  >
                    Logout
                  </Button>
                </Flex>
              ) : (
                <NextLink href="/login">
                  <Button
                    size="sm"
                    variant="outline"
                    background="purple.700"
                    _hover={{ color: 'purple.700', background: 'white' }}
                  >
                    Login
                  </Button>
                </NextLink>
              )}
            </Box>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};
