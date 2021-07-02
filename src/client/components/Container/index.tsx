import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';

export const Container: FC = ({ children }) => {
  return (
    <Box mx="auto" w="1000px" >
      {children}
    </Box>
  );
};
