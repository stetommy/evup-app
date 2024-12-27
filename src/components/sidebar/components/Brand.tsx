// Chakra imports
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { LvdereLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand(props: { mini: boolean; hovered: boolean }) {
  const { mini, hovered } = props;
  //   Chakra color mode
  const logoColor = useColorModeValue('navy.700', 'white');

  return (
    <Flex alignItems='center' flexDirection='column'>
      <LvdereLogo
        h='26px'
        w='175px'
        my='32px'
        color={logoColor}
        display={
          mini === false
            ? 'block'
            : mini === true && hovered === true
            ? 'block'
            : 'none'
        }
      />
      <Text
        display={
          mini === false
            ? 'none'
            : mini === true && hovered === true
            ? 'none'
            : 'block'
        }
        fontSize={'30px'}
        fontWeight='800'
        color={logoColor}
      >
        H
      </Text>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
