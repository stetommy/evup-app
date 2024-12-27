'use client';

import React, { useState } from 'react';
import NavLink from 'components/link/NavLink';
import { useRouter } from 'next/navigation';

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';

// Assets
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import illustration from '/public/img/auth/auth.png';

// Custom components
import DefaultAuth from '../../../components/auth/variants/DefaultAuthLayout/page';
import PrivateRoute from 'contexts/PrivateRoute';
import { useSignInMutation } from 'features/auth/authApi';
import { useDispatch } from 'react-redux';
import {
  setRefreshTokenValidation,
  userLoggedIn,
} from 'features/auth/authSlice';

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  // router
  const router = useRouter();

  // Logica per effettuare il login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState('');
  const [signIn, { isLoading }] = useSignInMutation();
  const dispatch = useDispatch();

  const handleSignIn = async (): Promise<void> => {
    try {
      const response: any = await signIn({ email, password });

      if (response?.data?.isActive) {
        dispatch(userLoggedIn(response?.data));
        dispatch(setRefreshTokenValidation(true));
        router.push('/user/dashboard');
      } else if (response?.error?.data) {
        setSignInError(response?.error?.data[0]);
      } else if (response?.data?.success && !response?.data?.isActive) {
        dispatch(userLoggedIn(response?.data));
        dispatch(setRefreshTokenValidation(true));

        router.push('/auth/pricing');
      }
    } catch (error) {
      console.error('Response from backend:', error.response.data[0]);
      console.error('Response from backend:', error);
    }
  };

  return (
    <PrivateRoute>
      <DefaultAuth illustrationBackground={illustration?.src}>
        <Flex
          maxW={{ base: '100%', md: 'max-content' }}
          w='100%'
          mx={{ base: 'auto', lg: '0px' }}
          me='auto'
          h='100%'
          alignItems='start'
          justifyContent='center'
          mb={{ base: '30px', md: '60px' }}
          px={{ base: '25px', md: '0px' }}
          mt={{ base: '40px', md: '14vh' }}
          flexDirection='column'
        >
          <Box me='auto'>
            <Heading color={textColor} fontSize='36px' mb='10px'>
              Accesso
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColorSecondary}
              fontWeight='400'
              fontSize='md'
            >
              Inserisci la tua email e la password per accedere!
            </Text>
          </Box>
          <Flex
            zIndex='2'
            direction='column'
            w={{ base: '100%', md: '420px' }}
            maxW='100%'
            background='transparent'
            borderRadius='15px'
            mx={{ base: 'auto', lg: 'unset' }}
            me='auto'
            mb={{ base: '20px', md: 'auto' }}
          >
            <FormControl>
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'
              >
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: '0px', md: '0px' }}
                type='email'
                placeholder='mail@evup.com'
                mb='24px'
                fontWeight='500'
                size='lg'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormLabel
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                display='flex'
              >
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size='md'>
                <Input
                  isRequired={true}
                  fontSize='sm'
                  placeholder='Min. 8 caratteri'
                  mb='24px'
                  size='lg'
                  type={show ? 'text' : 'password'}
                  variant='auth'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement display='flex' alignItems='center' mt='4px'>
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: 'pointer' }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <Flex justifyContent='space-between' align='center' mb='24px'>
                <FormControl display='flex' alignItems='center'></FormControl>
                <NavLink href='/auth/forgot-password'>
                  <Text
                    color={textColorBrand}
                    fontSize='sm'
                    w='124px'
                    fontWeight='500'
                  >
                    Ha dimenticato la password?
                  </Text>
                </NavLink>
              </Flex>
              <Button
                fontSize='sm'
                variant='brand'
                fontWeight='500'
                w='100%'
                h='50'
                mb='24px'
                onClick={handleSignIn}
                isDisabled={!email || !password}
                isLoading={isLoading}
              >
                Login
              </Button>
            </FormControl>
            {signInError && (
              <Text
                mb='36px'
                ms='4px'
                color='red.400'
                fontWeight='400'
                fontSize='md'
              >
                {signInError}
              </Text>
            )}
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='start'
              maxW='100%'
              mt='0px'
            >
              <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
                Non sei ancora registrato?
                <NavLink href='/auth/sign-up'>
                  <Text
                    color={textColorBrand}
                    as='span'
                    ms='5px'
                    fontWeight='500'
                  >
                    Crea un Account
                  </Text>
                </NavLink>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </DefaultAuth>
    </PrivateRoute>
  );
}

export default SignIn;
