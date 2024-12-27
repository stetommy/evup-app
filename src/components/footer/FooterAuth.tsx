'use client';
/* eslint-disable */

import {
  Flex,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'components/link/Link';

export default function Footer() {
  let textColor = useColorModeValue('gray.400', 'white');
  let linkColor = useColorModeValue({ base: 'gray.400', lg: 'white' }, 'white');
  return (
    <Flex
      zIndex='3'
      flexDirection={{
        base: 'column',
        lg: 'row',
      }}
      alignItems={{
        base: 'center',
        xl: 'start',
      }}
      justifyContent='space-between'
      px={{ base: '30px', md: '0px' }}
      pb='30px'
    >
      <Text
        color={textColor}
        textAlign={{
          base: 'center',
          xl: 'start',
        }}
        mb={{ base: '20px', lg: '0px' }}
      >
        {' '}
        &copy; {new Date().getFullYear()}
        <Text as='span' fontWeight='500' ms='4px'>
          EVUP. All Rights Reserved. Made with love by
          <Link
            mx='3px'
            color={textColor}
            href='https://weebo.cloud'
            fontWeight='700'
          >
            WeeBo!
          </Link>
        </Text>
      </Text>
      <List display='flex'>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link
            fontWeight='500'
            color={linkColor}
            href='mailto:support@evup.com'
          >
            Supporto
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link
            fontWeight='500'
            color={linkColor}
            href={process.env.NEXT_PUBLIC_TERMS_CONDITION_LINK}
          >
            Termini di utilizzo
          </Link>
        </ListItem>
        <ListItem>
          <Link
            fontWeight='500'
            color={linkColor}
            href={process.env.NEXT_PUBLIC_PRIVACY_POLICY_LINK}
          >
            Privacy & Policy
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
