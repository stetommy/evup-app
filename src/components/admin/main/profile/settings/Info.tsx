'use client';

// Chakra imports
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import InputField from 'components/fields/InputField';
import TextField from 'components/fields/TextField';
import { authApi, useChangeDescriptionMutation } from 'features/auth/authApi';
import { userLoggedIn } from 'features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Settings() {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'secondaryGray.600';

  const { user } = useSelector((state: any) => state.auth);

  const [changeDescription, { isLoading }] = useChangeDescriptionMutation();
  const [description, setDescription] = useState(null);
  const [isDescriptionUpdated, setIsDescriptionUpdated] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogOut = async () => {
    // logout();
    dispatch(userLoggedIn(null));
    const response = await dispatch<any>(
      authApi.endpoints.logOut.initiate(null)
    );
    if (response?.data?.success) {
      router.push('/auth/sign-in');
    }
  };

  const handleSaveDescription = async () => {
    const response: any = await changeDescription({ description: description });
    if (response?.data?.success) {
      setIsDescriptionUpdated(true);
      setTimeout(() => {
        setIsDescriptionUpdated(false);
      }, 3000);
      handleLogOut();
    }
  };

  return (
    <FormControl>
      {isDescriptionUpdated && (
        <Alert status='success'>
          <AlertIcon />
          Descrizione aggiornata con successo. Fire on!
        </Alert>
      )}

      <Card>
        <Flex direction='column' mb='40px' ms='10px'>
          <Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
            Impostazioni dell&apos;account
          </Text>
          <Text fontSize='md' color={textColorSecondary}>
            Qui puoi modificare le informazioni sull&apos;account utente
          </Text>
        </Flex>
        <SimpleGrid
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: '20px', xl: '20px' }}
        >
          <InputField
            mb='25px'
            me='30px'
            id='username'
            label='Utente'
            placeholder={`${user?.firstName} ${user?.lastName}`}
            onChange={undefined}
            disabled
          />
          <InputField
            mb='25px'
            id='email'
            label='Email'
            placeholder={`${user?.email}`}
            onChange={undefined}
            disabled
          />
          <InputField
            mb='25px'
            me='30px'
            id='first_name'
            label='Nome'
            placeholder={`${user?.firstName}`}
            onChange={undefined}
            disabled
          />
          <InputField
            mb='25px'
            id='last_name'
            label='Cognome'
            placeholder={`${user?.lastName}`}
            onChange={undefined}
            disabled
          />
        </SimpleGrid>
        <InputField
          id='job'
          label='Ruolo'
          placeholder={`${user?.role}`}
          onChange={undefined}
          disabled
        />
        <Box>
          <TextField
            id='about'
            label='Su di me'
            h='100px'
            placeholder={user?.description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>

        <Button
          variant='brand'
          minW='183px'
          fontSize='sm'
          fontWeight='500'
          ms='auto'
          onClick={handleSaveDescription}
          isDisabled={!description}
          isLoading={isLoading}
        >
          Salva
        </Button>
      </Card>
    </FormControl>
  );
}
