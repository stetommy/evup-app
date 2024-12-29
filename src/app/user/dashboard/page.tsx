'use client';

// Chakra imports
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

// Custom components
import React, { useState, useEffect } from 'react';
import { useGetPublishedEventsQuery } from 'features/events/eventsApi';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import MapFullEventComponent from 'components/map/MapFullEventComponent';

export default function Page() {
  // Chakra Color Mode
  const textColor = useColorModeValue('navy.700', 'white');
  const bgBadge = useColorModeValue('secondaryGray.300', 'whiteAlpha.50');
  const textBrand = useColorModeValue('brand.500', 'white');
  const mainText = useColorModeValue('navy.700', 'white');
 // Query per eventi
 const { data: Events, isLoading, isError } = useGetPublishedEventsQuery(null);

  const { user } = useSelector((state: any) => state.auth);
  const { push } = useRouter();

  const [passwordChangeModal, setPasswordChangeModal] = useState(false);

  const onClose = () => {
    setPasswordChangeModal(false);
  };

  useEffect(() => {
    if (user?.changePassword === true) {
      setPasswordChangeModal(true);
      push('/user/profile/settings');
    }
  }, [user]);

  //console.log('Events:', Events);

  if (isLoading) {
    return <Text>Caricamento eventi in corso...</Text>;
  }

  if (isError || !Events) {
    return <Text>Errore nel caricamento degli eventi o nessun evento disponibile.</Text>;
  }
  return (
    <>
      <Text
        color={mainText}
        bg='inherit'
        borderRadius='inherit'
        fontWeight='bold'
        fontSize='34px'
        _hover={{ color: { mainText } }}
        _active={{
          bg: 'inherit',
          transform: 'none',
          borderColor: 'transparent',
        }}
        _focus={{
          boxShadow: 'none',
        }}
        mt={{ base: "3.75rem", md: "3rem" }}
        mb={3}
      >
        Ecco i prossimi eventi in programma
      </Text>
      <MapFullEventComponent events={Events} zoom={9} />
      <Text color="blue.500" mt={4}>Clicca sul puntino blu per vedere le informazioni riguardanti l&apos;evento!</Text>
      <Box mt={4}>
        <>
          <Modal isOpen={passwordChangeModal} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Devi cambiare la password</ModalHeader>
              <ModalBody>
                Ti stiamo reindirizzando alla pagina del profilo...
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap='20px'>
          {Events &&
            Events.length > 0 &&
            Events?.map((event: any, idx: any) => (
              <Box key={idx}>
                <Card p='20px' h='full'>
                  <Flex align="center" direction={{ base: 'column' }}>
                    <Image
                      src={event?.picture_url || '/img/applications/course.png'}
                      alt={event?.title || 'Evento'}
                      boxSize='200px'
                      borderRadius='20px'
                    />
                    <Flex
                      justify='space-between'
                      flexDirection='column'
                      mb='auto'
                      py='30px'
                      pb={{ base: '0px', md: '0px' }}
                    >
                      <Flex flexDirection='column' mb='25px' textAlign='center'>
                        <Text
                          color={textColor}
                          fontSize={{
                            base: 'xl',
                            md: 'xl',
                            xl: 'xl',
                            '2xl': '28px',
                          }}
                          mb='10px'
                          fontWeight='700'
                        >
                          {event?.title}
                        </Text>
                        <Text
                          color='secondaryGray.600'
                          fontSize={{
                            base: 'md',
                          }}
                          fontWeight='400'
                          me='14px'
                          style={{
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3,
                            whiteSpace: 'normal',
                          }}
                        >
                          {event?.description}
                        </Text>
                      </Flex>
                      <Flex w='100%' flexWrap='wrap' justifyContent='center'>
                        {event?.tags?.map((tag: any, key: any) => (
                          <Badge
                            key={key}
                            bg={bgBadge}
                            textAlign='center'
                            mb={{ base: '20px', md: '0px' }}
                            color={textBrand}
                            me='10px'
                            h='max-content'
                          >
                            {tag.name}
                          </Badge>
                        ))}
                      </Flex>
                      <Flex mt='5' w='100%' justifyContent='space-between'>
                        <Text color={textColor} fontSize='sm' fontWeight='500'>
                          Inizio: {new Date(event?.time_start).toLocaleString()}
                        </Text>
                        <Text color={textColor} fontSize='sm' fontWeight='500'>
                          Fine: {new Date(event?.time_end).toLocaleString()}
                        </Text>
                      </Flex>
                      <Flex justifyContent='center' mt='20px'>
                        <Button
                          bg='brand.500'
                          color='white'
                          onClick={() => {
                            if (event?.slug) {
                              push(`/user/event/${event.slug}`);
                            } else {
                              alert('Slug non disponibile per questo evento.');
                            }
                          }}
                        >
                          Maggiori dettagli
                        </Button>

                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              </Box>
            ))}
        </SimpleGrid>
      </Box>
    </>
  );
}
