// Chakra Imports
import {
  Button,
  Flex,
  useColorModeValue,
  Radio,
  useRadio,
  UseRadioProps,
} from '@chakra-ui/react';
import React from 'react';

// Component
type HeaderLinksProps = UseRadioProps & {
  label: string;
  active?: boolean;
  children?: React.ReactNode;
};

export default function HeaderLinks(props: HeaderLinksProps) {
  const borderButton = useColorModeValue('secondaryGray.100', 'whiteAlpha.200');
  const activeShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.22)',
    'none'
  );
  const Bg = useColorModeValue('white', 'navy.700');
  const activeBg = useColorModeValue('#F7F9FF', 'whiteAlpha.100');

  // Hook useRadio
  const { getInputProps, getRadioProps } = useRadio(props);

  // Props per l'input e il bottone
  const input = getInputProps();
  const radio = getRadioProps();

  return (
    <Button
      {...radio} // Passa le props del radio al bottone
      h="max-content"
      py="16px"
      border="1px solid"
      display="flex"
      flexDirection="column"
      bg={props.active ? Bg : 'transparent'}
      boxShadow={props.active ? activeShadow : 'none'}
      _hover={{ background: Bg, boxShadow: activeShadow }}
      _focus={{ background: Bg, boxShadow: activeShadow }}
      _active={{ background: activeBg, boxShadow: activeShadow }}
      borderColor={borderButton}
      as="label"
      px={{ base: '10px', md: 'none' }}
    >
      <input {...input} style={{ display: 'none' }} />
      <Flex w="100%" justifyContent="space-between" mb="10px">
        {props.label}
        <Radio colorScheme="brand" isChecked={props.active} />
      </Flex>
      {props.children}
    </Button>
  );
}
