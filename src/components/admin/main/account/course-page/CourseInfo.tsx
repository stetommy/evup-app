'use client';

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  Stack,
} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import Rating from 'components/admin/main/account/course-page/Rating';
import Instructor from 'components/admin/main/account/course-page/Instructor';
import { useState } from 'react';

// Assets
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from 'react-icons/io';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export default function CourseInfo(props: { [x: string]: any; course: any }) {
  const [tabState, setTabState] = useState('notes');

  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.700', 'white');
  const textColorTertiary = useColorModeValue(
    'secondaryGray.600',
    'secondaryGray.500'
  );
  const borderColor = useColorModeValue('secondaryGray.500', 'white');
  const hover = useColorModeValue(
    { bg: 'secondaryGray.100' },
    { bg: 'whiteAlpha.100' }
  );
  const { handleNextLesson, handlePrevLesson, lessonNumber, lesson, course } =
    props;

  const splitText = (text: string, maxLength: number) => {
    const chunks = [];
    for (let i = 0; i < text.length; i += maxLength) {
      chunks.push(text.substring(i, i + maxLength));
    }
    return chunks.join('\n');
  };

  return (
    <Card mt='20px' p={{ base: '20px', md: '20px 40px' }}>
      <Flex align='center' w='100%'>
        <Text
          ms='auto'
          color={textColorTertiary}
          me='20px'
          fontSize='lg'
          fontWeight='500'
        >
          {`lezione ${lessonNumber + 1}/${course?.lessons?.length}`}
        </Text>
        <Button
          border='1px solid'
          borderColor={borderColor}
          bg='transparent'
          _hover={hover}
          me='10px'
          borderRadius='50%'
          h='38px'
          w='38px'
          onClick={handlePrevLesson}
          isDisabled={lessonNumber === 0}
        >
          <Icon as={MdChevronLeft} color={borderColor} h='24px' w='24px' />
        </Button>
        <Button
          onClick={handleNextLesson}
          variant='brand'
          borderRadius='50%'
          h='38px'
          w='38px'
          isDisabled={lessonNumber + 1 === course?.lessons?.length}
        >
          <Icon as={MdChevronRight} color={'white'} h='24px' w='24px' />
        </Button>
      </Flex>
      <Box w='100%' mb='40px'>
        <Flex direction={{ base: 'column', '3xl': 'row' }}>
          <Box me={{ md: '40px', '3xl': '40px' }}>
            <Tabs variant='soft-rounded' colorScheme='brandTabs' mb='60px'>
              <TabList overflowX={{ sm: 'scroll', lg: 'unset' }}>
                <Flex>
                  <Tab
                    pb='0px'
                    flexDirection='column'
                    onClick={function () {
                      setTabState('notes');
                    }}
                    me='10px'
                    bg='unset'
                    _selected={{
                      bg: 'none',
                    }}
                    _focus={{ border: 'none' }}
                    minW='max-content'
                  >
                    {lesson?.title && (
                      <Stack spacing={4} maxW='100%'>
                        <Text
                          color={
                            tabState === 'notes' ? textColor : textColorTertiary
                          }
                          fontSize={{ base: 'xl', lg: '4xl' }} // Dimensione del testo responsiva
                          fontWeight='600'
                        >
                          {lesson.title.substring(0, 30)}
                        </Text>
                        <Text
                          color={
                            tabState === 'notes' ? textColor : textColorTertiary
                          }
                          fontSize={{ base: 'xl', lg: '4xl' }} // Dimensione del testo responsiva
                          fontWeight='600'
                        >
                          {lesson.title.substring(30, 50)}
                        </Text>
                        <Text
                          color={
                            tabState === 'notes' ? textColor : textColorTertiary
                          }
                          fontSize={{ base: 'xl', lg: '4xl' }} // Dimensione del testo responsiva
                          fontWeight='600'
                        >
                          {lesson.title.substring(60)}
                        </Text>
                      </Stack>
                    )}

                    <Flex align='center'>
                      <Text
                        color={
                          tabState === 'notes' ? textColor : textColorTertiary
                        }
                        fontSize='lg'
                        fontWeight='500'
                      >
                        Descrizione
                      </Text>
                    </Flex>
                    <Box
                      height='4px'
                      w='100%'
                      transition='0.1s linear'
                      bg={tabState === 'notes' ? 'brand.500' : 'transparent'}
                      mt='15px'
                      borderRadius='30px'
                    />
                  </Tab>
                </Flex>
              </TabList>
              <TabPanels pt='30px'>
                <Text fontSize='lg' color={textColorSecondary} fontWeight='400'>
                  {lesson?.content}
                </Text>
              </TabPanels>
            </Tabs>
            <Flex direction={{ base: 'column', md: 'row' }} align='center'>
              <Box
                w={{ base: 'unset', md: '30%', '3xl': '50%' }}
                ms={{ base: 'auto', md: 'unset' }}
                me={{ base: 'auto', '3xl': '50px' }}
              >
                <Text
                  fontSize={{ base: '70px', '3xl': '80px' }}
                  color='orange.500'
                  fontWeight='700'
                  lineHeight='105%'
                  maxW='max-content'
                >
                  {course?.evaluation?.average?.toFixed(1)}
                </Text>
                <Flex mb='8px' maxW='max-content'>
                  {course?.evaluation?.average >= 1 ? (
                    <Icon color='orange.500' h='24px' w='24px' as={IoMdStar} />
                  ) : course?.evaluation?.average < 1 &&
                    course?.evaluation?.average !== 0 ? (
                    <Icon
                      color='orange.500'
                      h='24px'
                      w='24px'
                      as={IoMdStarHalf}
                    />
                  ) : (
                    <Icon
                      color='orange.500'
                      h='24px'
                      w='24px'
                      as={IoMdStarOutline}
                    />
                  )}
                  {course?.evaluation?.average >= 2 ? (
                    <Icon color='orange.500' h='24px' w='24px' as={IoMdStar} />
                  ) : course?.evaluation?.average > 1 &&
                    course?.evaluation?.average < 2 ? (
                    <Icon
                      color='orange.500'
                      h='24px'
                      w='24px'
                      as={IoMdStarHalf}
                    />
                  ) : (
                    <Icon
                      color='orange.500'
                      h='24px'
                      w='24px'
                      as={IoMdStarOutline}
                    />
                  )}
                  {course?.evaluation?.average >= 3 ? (
                    <Icon color='orange.500' h='24px' w='24px' as={IoMdStar} />
                  ) : course?.evaluation?.average > 2 &&
                    course?.evaluation?.average < 3 ? (
                    <Icon
                      color='orange.500'
                      h='24px'
                      w='24px'
                      as={IoMdStarHalf}
                    />
                  ) : (
                    <Icon
                      color='orange.500'
                      h='24px'
                      w='24px'
                      as={IoMdStarOutline}
                    />
                  )}
                  {course?.evaluation?.average >= 4 ? (
                    <Icon color='orange.500' h='24px' w='24px' as={IoMdStar} />
                  ) : course?.evaluation?.average > 3 &&
                    course?.evaluation?.average < 4 ? (
                    <Icon
                      color='orange.500'
                      h='24px'
                      w='24px'
                      as={IoMdStarHalf}
                    />
                  ) : (
                    <Icon
                      color='orange.500'
                      h='24px'
                      w='24px'
                      as={IoMdStarOutline}
                    />
                  )}
                  {course?.evaluation?.average === 5 ? (
                    <Icon color='orange.500' h='24px' w='24px' as={IoMdStar} />
                  ) : course?.evaluation?.average > 4 &&
                    course?.evaluation?.average !== 5 ? (
                    <Icon
                      color='orange.500'
                      h='24px'
                      w='24px'
                      as={IoMdStarHalf}
                    />
                  ) : (
                    <Icon
                      color='orange.500'
                      h='24px'
                      w='24px'
                      as={IoMdStarOutline}
                    />
                  )}
                </Flex>
                <Text
                  fontSize='lg'
                  color={textColorTertiary}
                  fontWeight='500'
                  maxW='max-content'
                  mb={{ base: '20px', md: '0px' }}
                >
                  Valutazione del corso
                </Text>
              </Box>
              <Box>
                <Rating
                  value={`${course?.evaluation?.five?.percentage}`}
                  mb='5px'
                  stars={5}
                />
                <Rating
                  value={`${course?.evaluation?.four?.percentage}`}
                  mb='5px'
                  stars={4}
                />
                <Rating
                  value={`${course?.evaluation?.three?.percentage}`}
                  mb='5px'
                  stars={3}
                />
                <Rating
                  value={`${course?.evaluation?.two?.percentage}`}
                  mb='5px'
                  stars={2}
                />
                <Rating
                  value={`${course?.evaluation?.one?.percentage}`}
                  stars={1}
                />
              </Box>
            </Flex>
          </Box>

          <Box
            mx={{ base: 'auto', xl: 'unset' }}
            maxW={{
              sm: '100%',
              md: '550px',
              lg: '500px',
              '2xl': '800px',
              '3xl': '300px',
            }}
          >
            <Instructor instructorInfo={course?.instructor} />
          </Box>
        </Flex>
      </Box>
    </Card>
  );
}
