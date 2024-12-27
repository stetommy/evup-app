'use client';

import React, { useState } from 'react';

// Chakra imports
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Badge,
  Icon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';

// Custom components
import Card from 'components/card/Card';
import IconBox from 'components/icons/IconBox';
import { useUnenrollCourseMutation } from 'features/enrollment/enrollmentApi';
import Link from 'next/link';

// Assets
import { MdOutlineTimer } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';
import { usePutRatingMutation } from 'features/course/courseApi';
/**
 * Return single course card formatted with data
 * @param icon Course icon
 * @param title Course title
 * @param desc Course description
 * @param date Course publish date
 * @param day Course publish date
 * @param time Course duration
 * @param topics Course tag
 * @param bgBox Css for the box
 * @returns Formatted course card component
 */
export default function Course(props: {
  icon: JSX.Element;
  title: string;
  desc: string;
  date: string;
  day: string;
  time: string;
  topics: string[];
  bgBox: string;
  slug?: string;
}) {
  const { icon, title, desc, date, day, time, topics, bgBox, slug } = props;
  const textColor = useColorModeValue('navy.700', 'white');
  const textBrand = useColorModeValue('brand.500', 'white');
  const bgBadge = useColorModeValue('secondaryGray.300', 'whiteAlpha.50');

  const dispatch = useDispatch();

  const [unenrollCourse, { isLoading: unenrolling }] =
    useUnenrollCourseMutation();
  const [putRating] = usePutRatingMutation();

  const [rating, setRating] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const handleUnenrolling = async () => {
    await unenrollCourse(slug);
  };

  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
    setRating(0);
  };

  const handleGiveRating = async () => {
    const response: any = await putRating({
      slug: slug,
      data: { stars: `${rating}` },
    });
    if (response?.data?.success || response?.data?.result) {
      setShowAlert(true);
      onClose();
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    }
  };

  return (
    <Card p='20px' h='max-content' minH={{ md: '450px', xl: 'auto' }}>
      {showAlert && (
        <>
          <Alert status='success' position='absolute' top='0'>
            <AlertIcon />
            <AlertTitle>Valutazione inviata!</AlertTitle>
          </Alert>
        </>
      )}
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex mb='8px' justifyContent='center'>
                {rating >= 1 ? (
                  <Icon
                    color='orange.500'
                    h='44px'
                    w='44px'
                    as={IoMdStar}
                    cursor='pointer'
                    onClick={() => setRating(1)}
                  />
                ) : (
                  <Icon
                    color='orange.500'
                    h='44px'
                    w='44px'
                    as={IoMdStarOutline}
                    cursor='pointer'
                    onClick={() => setRating(1)}
                  />
                )}
                {rating >= 2 ? (
                  <Icon
                    color='orange.500'
                    h='44px'
                    w='44px'
                    as={IoMdStar}
                    cursor='pointer'
                    onClick={() => setRating(2)}
                  />
                ) : (
                  <Icon
                    color='orange.500'
                    h='44px'
                    w='44px'
                    as={IoMdStarOutline}
                    cursor='pointer'
                    onClick={() => setRating(2)}
                  />
                )}
                {rating >= 3 ? (
                  <Icon
                    color='orange.500'
                    h='44px'
                    w='44px'
                    as={IoMdStar}
                    cursor='pointer'
                    onClick={() => setRating(3)}
                  />
                ) : (
                  <Icon
                    color='orange.500'
                    h='44px'
                    w='44px'
                    as={IoMdStarOutline}
                    cursor='pointer'
                    onClick={() => setRating(3)}
                  />
                )}
                {rating >= 4 ? (
                  <Icon
                    color='orange.500'
                    h='44px'
                    w='44px'
                    as={IoMdStar}
                    cursor='pointer'
                    onClick={() => setRating(4)}
                  />
                ) : (
                  <Icon
                    color='orange.500'
                    h='44px'
                    w='44px'
                    as={IoMdStarOutline}
                    cursor='pointer'
                    onClick={() => setRating(4)}
                  />
                )}
                {rating === 5 ? (
                  <Icon
                    color='orange.500'
                    h='44px'
                    w='44px'
                    as={IoMdStar}
                    cursor='pointer'
                    onClick={() => setRating(5)}
                  />
                ) : (
                  <Icon
                    color='orange.500'
                    h='44px'
                    w='44px'
                    as={IoMdStarOutline}
                    cursor='pointer'
                    onClick={() => setRating(5)}
                  />
                )}
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='brand' mr={3} onClick={handleGiveRating}>
                salva
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
      <Flex direction={{ base: 'column', md: 'column', xl: 'row' }}>
        <IconBox
          bg={bgBox}
          icon={icon}
          minW={{ base: '100%', xl: '270px' }}
          minH={{ base: '200px', xl: '270px' }}
          borderRadius='20px'
          me='34px'
        />
        <Flex
          justify='space-between'
          flexDirection='column'
          mb='auto'
          py='30px'
          pb={{ base: '0px', md: '0px' }}
          style={{ flexGrow: '1' }}
        >
          <Flex display={{ base: 'block', xl: 'flex' }}>
            <Box flexDirection='column' w={{ xl: '68%' }} mb='25px'>
              <Link href={`/user/course/course-page/${slug}`}>
                {' '}
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
                  {title}
                </Text>
              </Link>

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
                {desc}
              </Text>
            </Box>
            <Text
              ms='auto'
              mt='10px'
              color='secondaryGray.600'
              fontSize={{
                base: 'md',
              }}
              fontWeight='500'
            >
              {day} •{' '}
              <Text
                as='span'
                color={textColor}
                fontSize={{
                  base: 'md',
                }}
                fontWeight='500'
                ms='4px'
              >
                {date}
              </Text>
            </Text>
          </Flex>
          <Flex w='100%' flexWrap='wrap'>
            {topics?.map((topic: any, key) => (
              <Badge
                key={key}
                bg={bgBadge}
                textAlign='center'
                mb={{ base: '20px', md: '0px' }}
                color={textBrand}
                me='10px'
                h='max-content'
              >
                {topic.name}
              </Badge>
            ))}

            <Flex
              align='center'
              ms={{ base: '0px', xl: 'auto' }}
              pe={{ base: '10px', md: '0px' }}
            >
              <Icon as={MdOutlineTimer} color={textColor} me='6px' />
              <Text
                color={textColor}
                fontSize={{
                  base: 'sm',
                }}
                fontWeight='500'
                me='14px'
              >
                {time}
              </Text>
            </Flex>
          </Flex>
          <Button
            colorScheme='teal'
            variant='solid'
            mt='10px'
            onClick={handleUnenrolling}
            isLoading={unenrolling}
          >
            Annulla l&apos;iscrizione
          </Button>
          <Button
            mt='10px'
            colorScheme='teal'
            variant='outline'
            onClick={onOpen}
          >
            Dare una valutazione
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
