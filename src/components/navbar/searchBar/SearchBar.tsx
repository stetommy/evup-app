'use client';
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
export function SearchBar(props: {
  variant?: string;
  background?: string;
  children?: JSX.Element;
  placeholder?: string;
  borderRadius?: string | number;
  handleSearch?: any;
  [x: string]: any;
}) {
  // Pass the computed styles into the `__css` prop
  const {
    variant,
    background,
    children,
    placeholder,
    borderRadius,
    handleSearch,
    ...rest
  } = props;
  // Chakra Color Mode
  const searchIconColor = useColorModeValue('gray.700', 'white');
  const inputBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const inputText = useColorModeValue('gray.700', 'gray.100');
  const [texts, setTexts] = useState('');

  return (
    <InputGroup w='100%' {...rest}>
      <InputLeftElement>
        <IconButton
          aria-label='search'
          bg='inherit'
          borderRadius='inherit'
          _active={{
            bg: 'inherit',
            transform: 'none',
            borderColor: 'transparent',
          }}
          _focus={{
            boxShadow: 'none',
          }}
          icon={<SearchIcon color={searchIconColor} w='15px' h='15px' />}
          onClick={() => handleSearch(texts)}
        />
      </InputLeftElement>

      <Input
        variant='search'
        fontSize='sm'
        bg={background ? background : inputBg}
        color={inputText}
        fontWeight='500'
        _placeholder={{ color: 'gray.400', fontSize: '14px' }}
        borderRadius={borderRadius ? borderRadius : '30px'}
        placeholder={placeholder ? placeholder : 'Cerca...'}
        onChange={(e) => setTexts(e.target.value)}
      />
    </InputGroup>
  );
}
