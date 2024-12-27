'use client';

import React, { useState } from 'react';
import Link from 'components/link/Link';

// Chakra imports
import {
  Box,
  Flex,
  FormControl,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

// Assets
import illustration from '/public/img/auth/auth.png';
import DefaultAuth from '../../../components/auth/variants/DefaultAuthLayout/page';

// registrazione interattiva
import SignupFlow from 'components/auth/signup/SignupFlow';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from 'features/auth/authApi';

function SignUp() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');

  const router = useRouter();

  const [register, { isLoading }] = useRegisterMutation();
  const [signUpErrorMessage, setSignUpErrorMessage] = useState('');

  const handleSubmit = async (e: any) => {
    setSignUpErrorMessage('');
    try {
      const response: any = await register(e);
      if (response?.data?.success) {
        router.push('/auth/sign-in');
      } else if (response?.error?.data) {
        setSignUpErrorMessage(response?.error?.data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DefaultAuth illustrationBackground={illustration?.src}>
      <Flex
        w='100%'
        maxW='max-content'
        mx={{ base: 'auto', lg: '0px' }}
        me='auto'
        h='100%'
        justifyContent='center'
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '8vh' }}
        flexDirection='column'
      >
        <Box me='auto'>
          <Heading
            color={textColor}
            fontSize={{ base: '34px', lg: '36px' }}
            mb='10px'
          >
            Registrati
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'
          >
            Inserisci la tua email e la password per iscriverti!
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
            <SignupFlow
              onSubmit={(e: object) => {
                handleSubmit(e);
              }}
              loading={isLoading}
            />
          </FormControl>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'
          >
            <Text color={textColorDetails} fontWeight='400' fontSize='sm'>
              Sei già un membro?
              <Link href='/auth/sign-in'>
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'
                >
                  Login
                </Text>
              </Link>
            </Text>
            {signUpErrorMessage && (
              <Text color='red.400' fontWeight='400' fontSize='sm'>
                {signUpErrorMessage}
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignUp;
