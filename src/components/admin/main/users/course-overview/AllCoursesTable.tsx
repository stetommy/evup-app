import React from 'react';

import {
  Box,
  Button,
  Flex,
  Image,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import {
  useAllCoursesQuery,
  useMakeCoursePublishedMutation,
  useMakeCourseUnpublishedMutation,
  useRemoveCourseMutation,
} from 'features/course/courseApi';

import { setEditingCourse } from 'features/course/courseSlice';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { convertCourseTimeFormat, convertTimeFormat } from 'utils/utilis';

const AllCoursesTable = () => {
  const { data: courses } = useAllCoursesQuery(null);
  const { push } = useRouter();
  const dispatch = useDispatch();

  const [makeCoursePublished, { isLoading: publishing }] =
    useMakeCoursePublishedMutation();
  const [makeCourseUnpublished, { isLoading: unPublishing }] =
    useMakeCourseUnpublishedMutation();
  const [removeCourse, { isLoading: deleting }] = useRemoveCourseMutation();

  const handlePublishedCourse = async (content: any) => {
    if (content?.published === false) {
      const response: any = await makeCoursePublished(content?.slug);
      if (response.data.published) {
        return; // alert('Course published successfully!!');
      }
    }
    if (content?.published === true) {
      const response: any = await makeCourseUnpublished(content?.slug);
      if (response.data) {
        return; // alert('Course unPublished successfully!!');
      }
    }
  };

  const handleDelete = async (content: any) => {
    const response: any = await removeCourse(content?.slug);
    if (response?.data) {
      alert(`${content?.name} eliminato con successo!`);
    }
  };

  const handleEdit = (content: any) => {
    dispatch(setEditingCourse(content));
    push(`/user/instructor/edit-course/${content?.slug}`);
  };
  return (
    <TableContainer>
      <Table size='lg' variant='striped' colorScheme='teal'>
        <Thead>
          <Tr>
            <Th>NOME DEL CORSO</Th>
            <Th>DATA DI CREAZIONE</Th>
            <Th>DURATA</Th>
            <Th>PUBBLICATO</Th>
            <Th>MODIFICA</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses &&
            courses.length > 0 &&
            courses.map((item: any, idx: any) => (
              <Tr key={idx}>
                <Td>
                  <Flex alignItems='center' gap='10px'>
                    <Box w='50px' h='50px' borderRadius='full'>
                      <Image
                        src={item?.image}
                        w='100%'
                        h='100%'
                        alt={item?.name}
                        objectFit='cover'
                        borderRadius='full'
                      />
                    </Box>
                    <Text>{item?.name}</Text>
                  </Flex>
                </Td>
                <Td>{convertTimeFormat(item?.creationDate)}</Td>
                <Td>{convertCourseTimeFormat(item?.length)}</Td>
                <Td>
                  <Switch
                    colorScheme='teal'
                    size='lg'
                    isChecked={item?.published}
                    onChange={() => handlePublishedCourse(item)}
                    isDisabled={publishing || unPublishing}
                  />
                </Td>
                <Td>
                  <Flex gap='5px'>
                    <Button
                      colorScheme='teal'
                      variant='outline'
                      size='xs'
                      onClick={() => handleEdit(item)}
                    >
                      Modifica
                    </Button>
                    <Button
                      colorScheme='red'
                      size='xs'
                      onClick={() => handleDelete(item)}
                      isDisabled={deleting}
                    >
                      Elimina
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AllCoursesTable;
