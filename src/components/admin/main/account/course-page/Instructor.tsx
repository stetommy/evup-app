'use client';
// Chakra imports
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import Card from 'components/card/Card';
import { NextAvatar } from 'components/image/Avatar';

export default function CourseInfo(props: { [x: string]: any }) {
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const bg = useColorModeValue('secondaryGray.300', 'navy.700');
  const textColorSecondary = useColorModeValue(
    'secondaryGray.900',
    'secondaryGray.600'
  );
  const { instructorInfo, ...rest } = props;

  return (
    <Card h='maxContent' {...rest} mt='50px' bg={bg}>
      <Text color={textColor} fontSize='xl' fontWeight='700' mb='16px'>
        Informazioni sull&apos;istruttore
      </Text>
      <Flex alignItems='center' mb='20px'>
        <NextAvatar
          h='48px'
          w='48px'
          src={
            instructorInfo?.picture
              ? instructorInfo?.picture
              : 'https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
          }
          me='20px'
        />
        <Box>
          <Text color={textColor} fontSize='md' fontWeight='700'>
            {instructorInfo?.firstName} {instructorInfo?.lastName}
          </Text>
          <Text color='secondaryGray.600' fontSize='sm' fontWeight='400'></Text>
        </Box>
      </Flex>
      <Text color={textColorSecondary} fontSize='md' mb='20px'>
        {instructorInfo?.description}
      </Text>
      {/* <Button variant='brand'>See all courses</Button> */}
    </Card>
  );
}
