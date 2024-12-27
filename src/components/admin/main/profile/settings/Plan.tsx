'use client';

// Chakra imports
import {
  Badge,
  Box,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import { convertTimeFormat } from 'utils/utilis';
import Card from 'components/card/Card';

export default function Plan() {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const { user } = useSelector((state: any) => state.auth);
  return (
    <>
      {user?.plan && user?.dateRenew && (
        <Card mb='20px' w='100%' p='20px' alignItems='center'>
          <Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
            Piano Attivo
          </Text>
          <Flex>
            <Box ml='3' p='2'>
              {/* <Text fontWeight='bold'></Text> */}
              <Text pb='3'>
                Nome del piano:
                <Badge ml='1' colorScheme='blackAlpha' fontWeight='bold'>
                  {user?.plan}
                </Badge>
              </Text>
              <Text>
                Data di rinnovo:{' '}
                <Badge ml='1' colorScheme='purple'>
                  {convertTimeFormat(user?.dateRenew)}
                </Badge>
              </Text>
            </Box>
          </Flex>
        </Card>
      )}
    </>
  );
}
