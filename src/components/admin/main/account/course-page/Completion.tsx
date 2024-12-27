'use client';

// Chakra imports
import { Box, Flex, Text, Icon, useColorModeValue } from '@chakra-ui/react';

// Custom components
import Card from 'components/card/Card';
import { CircProgressMini } from 'components/charts/CircularProgress';

// Assets
import { MdCheck, MdChevronRight } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { setSelectedLesson } from 'features/course/courseSlice';

export default function CourseInfo(props: { [x: string]: any }) {
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorTertiary = useColorModeValue('secondaryGray.600', 'white');
  const { videoRef, lesson, course, ...rest } = props;
  const dispatch = useDispatch();

  const handleSecetLesson = (content: object) => {
    dispatch(setSelectedLesson(content));
  };
  return (
    <Card {...rest} maxH='max-content'>
      <Text color={textColor} fontSize='xl' fontWeight='700' mb='16px'>
        {course?.name}
      </Text>

      {course?.lessons &&
        course?.lessons.length > 0 &&
        course.lessons.map((item: any, idx: any) => (
          <Flex
            mb='25px'
            align='center'
            cursor='pointer'
            key={idx}
            onClick={() => handleSecetLesson(item)}
            bg={lesson?.slug === item?.slug && 'gray.200'}
            p='5px'
            borderRadius='5px'
          >
            <Box w='30px' me='12px'>
              <CircProgressMini
                step={`${idx + 1}`}
                percentage={item?.progress}
              />
            </Box>
            <Text
              color={textColorTertiary}
              fontWeight='500'
              fontSize='md'
              me='5px'
            >
              {item?.title}
            </Text>
            {item?.progress === 100 && (
              <Icon as={MdCheck} h='18px' w='18px' color={textColorTertiary} />
            )}
            <Icon
              as={MdChevronRight}
              ms='auto'
              h='22px'
              w='22px'
              color={textColorTertiary}
            />
          </Flex>
        ))}

      <Text color={textColor} fontSize='xl' fontWeight='700' mb='16px'>
        Cosa imparerai
      </Text>
      <Text color={textColor} fontSize='md' fontWeight='400' mb='50px'>
        {course?.descrition}
      </Text>
      <Text color={textColor} fontSize='xl' fontWeight='700' mb='16px'>
        Dai numeri
      </Text>
      <Flex mb='50px'>
        <Box>
          <Flex mb='6px'>
            <Text
              fontSize='md'
              fontWeight='400'
              color='secondaryGray.600'
              me='4px'
            >
              Studenti:
            </Text>
            <Text fontSize='md' fontWeight='700' color={textColor}>
              {course?.students}
            </Text>
          </Flex>
        </Box>
        <Box ms='70px'>
          <Flex mb='6px'>
            <Text
              fontSize='md'
              fontWeight='400'
              color='secondaryGray.600'
              me='4px'
            >
              Lezioni:
            </Text>
            <Text fontSize='md' fontWeight='700' color={textColor}>
              {course?.lessons.length}
            </Text>
          </Flex>
          <Flex mb='6px'>
            <Text
              fontSize='md'
              fontWeight='400'
              color='secondaryGray.600'
              me='4px'
            >
              Video:
            </Text>
            <Text fontSize='md' fontWeight='700' color={textColor}>
              {course?.length} hrs
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
}
