import {
  Button,
  Flex,
  useColorModeValue,
  Radio,
  useRadio,
  UseRadioProps,
} from '@chakra-ui/react';
import React from 'react';

type ConfiguratorRadioProps = UseRadioProps & {
  label: React.ReactNode; // Accetta sia stringhe che JSX come etichetta
  active?: boolean;
  children?: React.ReactNode;
};

export default function ConfiguratorRadio(props: ConfiguratorRadioProps) {
  const borderButton = useColorModeValue('secondaryGray.100', 'whiteAlpha.200');
  const activeShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.22)',
    'none'
  );
  const Bg = useColorModeValue('white', 'navy.700');
  const activeBg = useColorModeValue('#F7F9FF', 'whiteAlpha.100');

  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const radio = getRadioProps();

  return (
    <Button
      {...radio}
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
    >
      <input {...input} style={{ display: 'none' }} />
      <Flex w="100%" justifyContent="space-between" mb="10px">
        {props.label} {/* Ora accetta anche JSX */}
        <Radio colorScheme="brand" isChecked={props.active} />
      </Flex>
      {props.children}
    </Button>
  );
}
