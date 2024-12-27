'use client';
// Chakra imports
import {
  Flex,
  FormControl,
  Textarea,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';

import InputField from 'components/fields/InputField';

export default function Settings() {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  return (
    <FormControl>
      <Flex direction='column'>
        <InputField
          type='text'
          mb='20px'
          id='title'
          label='Titolo'
          placeholder='Lezione 1'
          onChange={null}
        />
        <Text>Descrizione:</Text>
        <Textarea
          value=''
          placeholder='Inserisci qui la descrizione della lezione'
          size='sm'
        />
      </Flex>
    </FormControl>
  );
}
