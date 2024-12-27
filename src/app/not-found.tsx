'use client';

// Chakra imports
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'components/link/Link';
/* import { Image } from 'components/image/Image'; */
import Image from 'next/image'
// Assets
import error from '/public/img/others/error.png';

export default function NotFound() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'brand.400');

  return (
    <Flex direction='column' align='center' pt={{ sm: '125px', lg: '75px' }}>
      <Image
        src={error}
        width='400'
        height='400'
        alt='404-notfound'
      />
      <Text
        color={textColor}
        fontSize={{ base: '40px', lg: '46px' }}
        fontWeight='700'
        mb='30px'
        textAlign={{ base: 'center', md: 'start' }}
      >
        Oh, cavolo. Non abbiamo trovato questa pagina.
      </Text>
      <Flex align='center' direction={{ base: 'column', md: 'row' }}>
        <Text
          color={textColor}
          fontWeight='500'
          fontSize={{ base: 'md', md: 'lg' }}
          me='4px'
        >
          Forse è meglio ricominciare dalla nostra home page...
        </Text>
        <Link fontSize='md' fontWeight='500' color={brandColor} href='/'>
          Ritorna alla home
        </Link>
      </Flex>
    </Flex>
  );
}
