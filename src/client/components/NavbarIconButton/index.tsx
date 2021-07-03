import { IconButton, Tooltip } from '@chakra-ui/react';
import React, { FC } from 'react';

interface Props {
  tooltipLabel: string;
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

export const NavbarIconButton: FC<Props> = ({ tooltipLabel, icon }) => {
  return (
    <Tooltip
      label={tooltipLabel}
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
        icon={icon}
      />
    </Tooltip>
  );
};
