import { Box, Button, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { User } from '../../../server/common/types/user';
import { logout } from '../../app/slices/authSlice';
import { AppDispatch } from '../../app/store';

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
    <Flex color="white" bg="purple.700" h="48px" p={4}>
      <Flex
        mx="auto"
        w="100%"
        maxW="1000px"
        align="center"
        justify="space-between"
      >
        <Box>App Name</Box>
        <Box>
          {user ? (
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
          ) : (
            <Flex gridGap={2}>
              <Button
                size="sm"
                variant="outline"
                background="purple.700"
                _hover={{ color: 'purple.700', background: 'white' }}
              >
                Register
              </Button>
              <Button
                size="sm"
                variant="outline"
                background="purple.700"
                _hover={{ color: 'purple.700', background: 'white' }}
              >
                Login
              </Button>
            </Flex>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};
