'use client';

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
  Text,
  Link,
} from '@chakra-ui/react';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Custom components
import DefaultAuth from '../../../components/auth/variants/DefaultAuthLayout/page';

// Assets
import illustration from '/public/img/auth/auth.png';
import { usePasswordRecoverMutation } from 'features/auth/authApi';
import { email_validation } from 'components/auth/signup/ValidationPatterns';

function ForgotPassword() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');

  // router
  const router = useRouter();

  const [passwordRecover, { isLoading, isSuccess }] =
    usePasswordRecoverMutation();

  // logica per effettuare il reset della password
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const gg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleReset = async (): Promise<void> => {
    setErrorMessage('');
    if (email) {
      if (!email.match(email_validation?.validation.pattern.value)) {
        setErrorMessage(email_validation?.validation.pattern.message);
        return;
      }
      const response: any = await passwordRecover({ email });

      if (response?.data) {
        router.push('/auth/sign-in');
      } else if (response?.error) {
        setErrorMessage(response?.error?.data[0]);
      }
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
        alignItems='start'
        justifyContent='center'
        mb={{ base: '30px', md: '60px', lg: '100px', xl: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', lg: '16vh', xl: '22vh' }}
        flexDirection='column'
      >
        <Box me='auto' mb='34px'>
          <Heading
            color={textColor}
            fontSize={{ base: '3xl', md: '36px' }}
            mb='16px'
          >
            Hai dimenticato la password?
          </Heading>
          <Text
            color={textColorSecondary}
            fontSize='md'
            w={{ base: '100%', lg: '456px' }}
            maxW='100%'
          >
            Nessun problema. Inserisci semplicemente l`&apos;`indirizzo e-mail
            utilizzato in fase di registrazione. Riceverai un`&apos;`e-mail con
            il link per la reimpostazione della password.
          </Text>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: '100%', lg: '456px' }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: 'auto', lg: 'unset' }}
          me='auto'
          mb={{ base: '20px', md: 'auto' }}
          align='start'
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
              type='email'
              placeholder='mail@evup.com'
              mb='24px'
              size='lg'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errorMessage && <Text color='red.600'>{errorMessage}</Text>}
            <Button
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'
              onClick={handleReset}
              isDisabled={!email}
              isLoading={isLoading}
            >
              Email password reset link
            </Button>
          </FormControl>
          {/* già membro link to login */}
          <Text color={textColorDetails} fontWeight='400' fontSize='sm'>
            Ritorna alla pagina di
            <Link href='/auth/sign-in'>
              <Text color={textColorBrand} as='span' ms='5px' fontWeight='500'>
                Login
              </Text>
            </Link>
          </Text>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default ForgotPassword;
