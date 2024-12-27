'use client';
// Chakra imports

import {
  Box,
  Flex,
  Stack,
  Text,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import Link from 'components/link/Link';
import { MdOutlineLogout } from 'react-icons/md';

// Custom components
import { LvdereIcon } from 'components/icons/Icons';
import { SidebarContext } from 'contexts/SidebarContext';
import { userLoggedIn } from 'features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { authApi } from 'features/auth/authApi';
import { useRouter } from 'next/router';

// Assets
export default function AuthNavbar(props: {
  logo?: JSX.Element | string;
  logoText?: string;
  secondary?: boolean;
  sidebarWidth?: number;
}) {
  const { logoText, sidebarWidth } = props;
  const logoColor = useColorModeValue('white', 'white');

  //const router = useRouter();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    dispatch(userLoggedIn(null));
    const response = await dispatch<any>(
      authApi.endpoints.logOut.initiate(null)
    ).unwrap();
    if (response?.success) {
      //router.push('/auth/sign-in');
      console.log("LOGOUTED")
    }
  };

  // Chakra color mode

  const mainText = '#fff';
  const navbarBg = 'none';
  const navbarShadow = 'initial';
  const bgButton = 'white';
  const colorButton = 'brand.500';
  const navbarPosition = 'absolute' as const;

  let brand = (
    <Link
      href={`${process.env.PUBLIC_URL}/`}
      display='flex'
      lineHeight='100%'
      fontWeight='bold'
      justifyContent='center'
      alignItems='center'
      color={mainText}
    >
      <Stack
        direction='row'
        spacing='12px'
        alignItems='center'
        justify='center'
      >
        <LvdereIcon h='26px' w='175px' color={logoColor} />
      </Stack>
      <Text fontSize='sm' mt='3px'>
        {logoText}
      </Text>
    </Link>
  );
  if (props.secondary === true) {
    brand = (
      <Link
        minW='175px'
        href={`${process.env.PUBLIC_URL}/`}
        display='flex'
        lineHeight='100%'
        fontWeight='bold'
        justifyContent='center'
        alignItems='center'
        color={mainText}
      >
        <LvdereIcon h='26px' w='175px' my='32px' color={logoColor} />
      </Link>
    );
  }

  return (
    <SidebarContext.Provider value={{ sidebarWidth }}>
      <Flex
        position={navbarPosition}
        top='16px'
        left='50%'
        transform='translate(-50%, 0px)'
        background={navbarBg}
        boxShadow={navbarShadow}
        borderRadius='15px'
        px='16px'
        py='22px'
        mx='auto'
        width='1044px'
        maxW='90%'
        alignItems='center'
        zIndex='3'
      >
        <Flex w='100%' justifyContent={{ sm: 'start', lg: 'space-between' }}>
          {brand}
          <Box
            ms={{ base: 'auto', lg: '0px' }}
            display={{ base: 'flex', lg: 'none' }}
            justifyContent='center'
            alignItems='center'
          >
          </Box>
          <Button
            bg={bgButton}
            color={colorButton}
            rightIcon={<MdOutlineLogout />}
            fontSize='xs'
            variant='no-effects'
            borderRadius='50px'
            px='45px'
            display={{
              sm: 'flex',
              lg: 'flex',
            }}
            onClick={handleLogOut}
          >
            Logout
          </Button>
          {/* </Link> */}
        </Flex>
      </Flex>
    </SidebarContext.Provider>
  );
}
