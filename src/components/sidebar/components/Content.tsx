// chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
//   Custom components
import Brand from 'components/sidebar/components/Brand';
import Links from 'components/sidebar/components/Links';
import avatar4 from '/public/img/avatars/stetommy.jpeg';
import { IRoute } from 'types/navigation';
import React from 'react';
import { useSelector } from 'react-redux';

// FUNCTIONS

function SidebarContent(props: {
  routes: IRoute[];
  hovered?: boolean;
  mini?: boolean;
}) {
  const { routes, mini, hovered } = props;
  const textColor = useColorModeValue('navy.700', 'white');

  const { user } = useSelector((state: any) => state.auth);
  /* console.log(user, 'userrr'); */
  // SIDEBAR
  return (
    <Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
      <Brand mini={mini} hovered={hovered} />
      <Stack direction='column' mb='auto' mt='8px'>
        <Box
          ps={
            mini === false
              ? '20px'
              : mini === true && hovered === true
                ? '20px'
                : '16px'
          }
          pe={{ md: '16px', '2xl': '1px' }}
          ms={mini && hovered === false ? '-16px' : 'unset'}
        >
          <Links mini={mini} hovered={hovered} routes={routes} />
        </Box>
      </Stack>

      <Box ps='20px' pe={{ md: '16px', '2xl': '0px' }} mt='60px'></Box>

      <Flex mt='75px' mb='56px' justifyContent='center' alignItems='center'>
        <Avatar
          h='48px'
          w='48px'
          src={user?.picture ? user?.picture : avatar4.src}
          me={
            mini === false
              ? '20px'
              : mini === true && hovered === true
                ? '20px'
                : '0px'
          }
        />
        <Box
          display={
            mini === false
              ? 'block'
              : mini === true && hovered === true
                ? 'block'
                : 'none'
          }
        >
          <Text color={textColor} fontSize='md' fontWeight='700'>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text color='secondaryGray.600' fontSize='sm' fontWeight='400'>
            {user?.role}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SidebarContent;
