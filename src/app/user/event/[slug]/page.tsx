'use client';

import {
  Box,
  Button,
  Card,
  Flex,
  Image,
  Text,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetEventBySlugQuery } from 'features/events/eventsApi';
import MapComponent from 'components/map/MapComponent';

export default function EventDetailsPage() {
  const { slug } = useParams(); // Ottieni lo slug dinamico dalla URL
  const { push } = useRouter();
  //const coords = { latitude: 40.7128, longitude: -74.0060 };

  // Debug per verificare lo slug
  //console.log('Slug:', slug);

  // Chakra Color Mode
  const textColor = useColorModeValue('navy.700', 'white');
  const bgBadge = useColorModeValue('secondaryGray.300', 'whiteAlpha.50');
  const textBrand = useColorModeValue('brand.500', 'white');

  // Recupera l'evento in base allo slug
  const { data: event, isLoading, error } = useGetEventBySlugQuery(slug);

  // Gestione degli stati di caricamento/errore
  if (isLoading) {
    return <Text>Caricamento...</Text>;
  }

  if (error || !event) {
    return (
      <Box>
        <Text color="red.500">Errore: Evento non trovato!</Text>
        <Button onClick={() => push('/user/event')}>Torna agli eventi</Button>
      </Box>
    );
  }

  // Debug per verificare i tags
  //console.log('Event tags:', event.tags);
  //console.log('Evento', event.coordinates)

  return (
    <Box mt="50px">
      <Card p="20px" borderRadius="20px">
        <Flex direction="column" align="center">
          <Flex w="100%" align="center" justify="center" gap="4">
            <Image
              src={event.picture_id || '/img/applications/course.png'}
              alt={event.title || 'Evento'}
              boxSize="300px"
              borderRadius="20px"
            />
            {event.coordinates?.latitude && event.coordinates?.longitude ? (
              <MapComponent
                latitude={event.coordinates.latitude}
                longitude={event.coordinates.longitude}
                zoom={16}
              />
            ) : (
              <Text color="red.500">Mappa non disponibile</Text>
            )}
          </Flex>
          <Text
            color={textColor}
            fontSize="3xl"
            fontWeight="bold"
            mt="20px"
            textAlign="center"
          >
            {event.title || 'ND'}
          </Text>
          <Text
            color="secondaryGray.600"
            fontSize="md"
            mt="10px"
            textAlign="center"
          >
            {event.sbtitle || 'ND'}
          </Text>
          <Text
            color="secondaryGray.600"
            fontSize="md"
            mt="10px"
            textAlign="center"
          >
            {event.address || 'ND'}
          </Text>
          <Flex mt="20px" flexWrap="wrap" justifyContent="center">
            {Array.isArray(event.tags) ? (
              event.tags.map((tag: any, key: number) => (
                <Badge
                  key={key}
                  bg={bgBadge}
                  color={textBrand}
                  textAlign="center"
                  me="10px"
                  h="max-content"
                >
                  {tag.name || 'ND'}
                </Badge>
              ))
            ) : (
              <Badge
                bg={bgBadge}
                color={textBrand}
                textAlign="center"
                me="10px"
                h="max-content"
              >
                {event.tags?.name || 'ND'}
              </Badge>
            )}
          </Flex>
          <Flex direction="column" align="center" mt="20px">
            <Text color={textColor} fontSize="md" fontWeight="500">
              Ospite Speciale: {event.special_guest?.name || 'ND'}
            </Text>
          </Flex>
          <Flex w="100%" justifyContent="space-between" mt="20px">
            <Text color={textColor} fontSize="sm" fontWeight="500">
              Inizio: {event.time_start ? new Date(event.time_start).toLocaleString() : 'ND'}
            </Text>
            <Text color={textColor} fontSize="sm" fontWeight="500">
              Fine: {event.time_end ? new Date(event.time_end).toLocaleString() : 'ND'}
            </Text>
          </Flex>
          <Flex direction="column" align="center" mt="20px">
            <Text color={textColor} fontSize="sm" fontWeight="500">
              Creato da: {event.created_by || 'ND'}
            </Text>
            <Text color={textColor} fontSize="sm" fontWeight="500">
              Ultimo Aggiornamento: {event.update_on ? new Date(event.update_on).toLocaleString() : 'ND'}
            </Text>
          </Flex>
          <Button mt="20px" bg="brand.500" color="white" onClick={() => push('/user/dashboard')}>
            Torna agli eventi
          </Button>
        </Flex>
      </Card>
    </Box>
  );
}
