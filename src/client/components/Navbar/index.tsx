import { Box, Button, Flex, IconButton, Tooltip } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';
import React, { FC, useState } from 'react';
import { RiProfileLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { User } from '../../../server/common/types/user';
import { logout } from '../../app/slices/authSlice';
import { AppDispatch } from '../../app/store';
import { Container } from '../Container';

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
            <NextLink href="/app">App Name</NextLink>
            <Box>
              {user ? (
                <Flex gridGap={2}>
                  <NextLink href="/profile">
                    <a>
                      <Tooltip
                        label="User Profile"
                        background="purple.800"
                        borderRadius={0}
                        borderTop="4px solid"
                        borderTopColor="purple.600"
                      >
                        <IconButton
                          p={0}
                          minW="32px"
                          w="32px"
                          h="32px"
                          borderRadius="50%"
                          background="purple.700"
                          _hover={{ color: 'purple.700', background: 'white' }}
                          aria-label="user-profile"
                          icon={<RiProfileLine />}
                        />
                      </Tooltip>
                    </a>
                  </NextLink>
                  <Button
                    size="sm"
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
