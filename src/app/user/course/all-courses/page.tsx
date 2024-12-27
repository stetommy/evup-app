'use client';

import React, { useState } from 'react';

// Chakra imports
import {
  Box,
  Flex,
  Grid,
  Image,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

// Custom components
import Card from 'components/card/Card';
import Course from 'components/card/Course';
import MiniCalendar from 'components/calendar/MiniCalendar';
import Hours from 'components/admin/main/account/all-courses/Hours';

// Assets
import { VSeparator } from 'components/separator/Separator';
import {
  convertCourseCreationTime,
  convertCourseTimeFormat,
} from 'utils/utilis';
import { useGetEnrolledCourseQuery } from 'features/enrollment/enrollmentApi';
import { useGetAllTagsQuery } from 'features/tags/tagsApi';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSearchText } from 'features/course/courseSlice';

export default async function Courses() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const [tabState, setTabState] = useState<any>('all');
  const mainText = useColorModeValue('navy.700', 'white');

  const { data: enrolledCourses } = useGetEnrolledCourseQuery(null);
  const { data: allTags } = useGetAllTagsQuery(null);

  const { searchText } = useSelector((state: any) => state.course);
  const dispatch = useDispatch();

  const handleSearch = (value) => {
    dispatch(setSearchText(value));
  };

  const handleTagFilter = (data: any) => {
    if (tabState !== 'all') {
      const tagItem = data?.tags?.find((i) => i?.slug === tabState?.slug);
      return !!tagItem;
    } else if (searchText) {
      return data?.name
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase());
    } else {
      return true;
    }
  };

  const tagsCourseNumber = (slug: any) => {
    const filteredCourses = enrolledCourses?.courses?.filter(
      (i) => i?.tags?.find((j) => j?.slug === slug)
    );
    return filteredCourses?.length;
  };

  /* console.log(enrolledCourses, 'enrolled'); */

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
      >
        Corsi
      </Text>
      <Grid
        pt={{ base: '130px', md: '80px', xl: '80px' }}
        gridTemplateColumns={{ md: '2.15fr 1fr', xl: '2.95fr 1fr' }}
        display={{ base: 'block', lg: 'grid' }}
      >
        <Flex gridArea='1 / 1 / 2 / 2' display={{ base: 'block', lg: 'flex' }}>
          <Tabs variant='soft-rounded' colorScheme='brandTabs'>
            <SearchBar
              mb='10px'
              me='10px'
              borderRadius='30px'
              handleSearch={handleSearch}
            />
            <TabList
              mx={{ base: '10px', lg: '30px' }}
              overflowX={{ sm: 'scroll', lg: 'unset' }}
            >
              <Flex>
                <Tab
                  pb='0px'
                  flexDirection='column'
                  onClick={function () {
                    setTabState('all');
                  }}
                  me='10px'
                  bg='unset'
                  _selected={{
                    bg: 'none',
                  }}
                  _focus={{ border: 'none' }}
                  minW='max-content'
                >
                  <Flex align='center'>
                    <Text
                      color={textColor}
                      fontSize='lg'
                      fontWeight='500'
                      me='12px'
                    >
                      Tutti
                    </Text>
                    <Text
                      color='secondaryGray.600'
                      fontSize='md'
                      fontWeight='400'
                    >
                      {enrolledCourses?.courses?.length}
                    </Text>
                  </Flex>
                  <Box
                    height='4px'
                    w='100%'
                    transition='0.1s linear'
                    bg={tabState === 'all' ? 'brand.500' : 'transparent'}
                    mt='15px'
                    borderRadius='30px'
                  />
                </Tab>

                {allTags &&
                  allTags?.length > 0 &&
                  allTags.map((tag, idx) => (
                    <Tab
                      key={idx}
                      pb='0px'
                      flexDirection='column'
                      onClick={function () {
                        setTabState(tag);
                      }}
                      me='10px'
                      bg='unset'
                      _selected={{
                        bg: 'none',
                      }}
                      _focus={{ border: 'none' }}
                      minW='max-content'
                    >
                      <Flex align='center'>
                        <Text
                          color={textColor}
                          fontSize='lg'
                          fontWeight='500'
                          me='12px'
                        >
                          {tag?.name}
                        </Text>
                        <Text
                          color='secondaryGray.600'
                          fontSize='md'
                          fontWeight='400'
                        >
                          {tagsCourseNumber(tag?.slug)}
                        </Text>
                      </Flex>
                      <Box
                        height='4px'
                        w='100%'
                        transition='0.1s linear'
                        bg={
                          tabState?.slug === tag?.slug
                            ? 'brand.500'
                            : 'transparent'
                        }
                        mt='15px'
                        borderRadius='30px'
                      />
                    </Tab>
                  ))}
              </Flex>
            </TabList>
            <TabPanels>
              <TabPanel px='0px'>
                <SimpleGrid columns={1} gap='20px'>
                  {enrolledCourses && enrolledCourses?.courses.length > 0 ? (
                    enrolledCourses?.courses
                      ?.filter(handleTagFilter)
                      .map((item: any, idx: any) => (
                        <Course
                          key={idx}
                          bgBox='linear-gradient(115.07deg, #29E9F5 -9.41%, #7A64FF 28.04%, #FF508B 71.85%, #FD6D53 112.49%, #FD6D53 112.49%)'
                          icon={
                            <Image
                              src={item?.image}
                              alt='Dan Abramov'
                              boxSize='150px'
                            />
                          }
                          title={item?.name}
                          desc={item?.description}
                          day={`${convertCourseCreationTime(item?.creationDate)
                            ?.day}`}
                          date={`${convertCourseCreationTime(item?.creationDate)
                            ?.month}`}
                          slug={item?.slug}
                          topics={item?.tags}
                          time={convertCourseTimeFormat(item?.length)}
                        />
                      ))
                  ) : (
                    <Text textAlign='center' mt='20px'>
                      Non ti sei iscritto a nessun corso!
                    </Text>
                  )}
                </SimpleGrid>
              </TabPanel>

              {allTags &&
                allTags?.length > 0 &&
                allTags.map((tag, idx) => (
                  <TabPanel px='0px' key={idx}>
                    <SimpleGrid columns={1} gap='20px'>
                      {enrolledCourses &&
                      enrolledCourses?.courses.length > 0 ? (
                        enrolledCourses?.courses
                          ?.filter(handleTagFilter)
                          .map((item: any, idx: any) => (
                            <Course
                              key={idx}
                              bgBox='linear-gradient(115.07deg, #29E9F5 -9.41%, #7A64FF 28.04%, #FF508B 71.85%, #FD6D53 112.49%, #FD6D53 112.49%)'
                              icon={
                                <Image
                                  src={item?.image}
                                  alt='Dan Abramov'
                                  boxSize='150px'
                                />
                              }
                              title={item?.name}
                              desc={item?.description}
                              day={`${convertCourseCreationTime(
                                item?.creationDate
                              )?.day}`}
                              date={`${convertCourseCreationTime(
                                item?.creationDate
                              )?.month}`}
                              slug={item?.slug}
                              topics={item?.tags}
                              time={convertCourseTimeFormat(item?.length)}
                            />
                          ))
                      ) : (
                        <Text textAlign='center' mt='20px'>
                          Non ti sei iscritto a nessun corso!
                        </Text>
                      )}
                    </SimpleGrid>
                  </TabPanel>
                ))}
            </TabPanels>
          </Tabs>
          <VSeparator mx='30px' h='100%' />
        </Flex>
        <Card
          alignItems='center'
          flexDirection='column'
          gridArea='1 / 2 / 2 / 3'
          w='100%'
        >
          <Grid
            templateColumns={{ md: 'repeat(2, 1fr)', lg: '1fr' }}
            w={'100%'}
            justifyContent={'center'}
          >
            <MiniCalendar
              gridArea={{ md: '1 / 1 / 2 / 2;', lg: '1 / 1 / 2 / 2' }}
              selectRange={false}
              mb='20px'
            />

            <Hours gridArea={{ md: '2 / 1 / 3 / 3', lg: '3 / 1 / 4 / 2' }} />
          </Grid>
        </Card>
      </Grid>
    </>
  );
}
