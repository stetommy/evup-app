'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ChakraProvider,
  Box,
  Input,
  Button,
  Flex,
  VStack,
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  HStack,
  Select,
  CircularProgress,
  Card,
  useColorModeValue,
  FormControl,
  Textarea,
  FormLabel,
  Progress,
  CircularProgressLabel,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

import Dropzone from 'components/admin/main/ecommerce/settings-product/DropzoneCard';
import InputField from 'components/fields/InputField';
import Delete from 'components/admin/main/ecommerce/settings-product/Delete';
import Details from 'components/admin/main/ecommerce/settings-product/Details';
import TagsField from 'components/fields/TagsField';
import { authToken } from 'variables/AuthToken';
import { useRouter } from 'next/navigation';
//import { apiRequest } from 'features/middleware/utils';

import {
  courseApi,
  useAddLessonMutation,
  useDeleteLessonMutation,
  useEditCourseMutation,
  useEditingLessonMutation,
  useGetLessonDataQuery,
  useSingleCourseQuery,
} from 'features/course/courseApi';
import { useReFreshTokenMutation } from 'features/auth/authApi';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSelectedLesson } from 'features/course/courseSlice';
import { MdSettings } from 'react-icons/md';
import axios from 'axios';
import {
  useAddCourseToTagMutation,
  useGetAllTagsQuery,
  useGetCourseTagsQuery,
} from 'features/tags/tagsApi';

const initialLessons = [
  { id: 'lesson1', content: 'Lezione 1' },
  { id: 'lesson2', content: 'Lezione 2' },
  { id: 'lesson3', content: 'Lezione 3' },
];

export default function EditCourse({ params }: { params: { slug: string } }) {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const mainText = useColorModeValue('navy.700', 'white');

  const { push } = useRouter();

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addLessonModalOpen, setAddLessonModalOpen] = useState(false);

  // all the states
  const [addLessonData, setAddLessonData] = useState<any>({});
  const [editData, setEditData] = useState<any>({});
  const [editLesson, setEditLesson] = useState<any>({});
  const [progress, setProgress] = useState(0);
  const [lessonData, setLessonData] = useState(null);
  const [isLessonAdding, setIsLessonAdding] = useState(false);

  // ref
  const inputRef = useRef(null);
  const lessonVideoInputRef = useRef(null);

  // redux state and dispatch fuctions
  const { selectedLesson } = useSelector((state: any) => state.course);
  const dispatch = useDispatch();

  // api calls
  const [editCourse, { isLoading: editing }] = useEditCourseMutation();
  const [addLesson, { isLoading: lessonAdding }] = useAddLessonMutation();
  const [deleteLesson, { isLoading: deleting }] = useDeleteLessonMutation();
  const [editingLesson, { isLoading: lessonEditing }] =
    useEditingLessonMutation();
  const { data, error, refetch } = useSingleCourseQuery(params?.slug);
  const { data: allTags } = useGetAllTagsQuery(null);
  const [addCourseToTag, { isLoading: tagAdding }] =
    useAddCourseToTagMutation();
  const { data: courseTags } = useGetCourseTagsQuery(params?.slug);
  /* console.log(courseTags, 'cousrs'); */

  // const { data: lessonData } = useGetLessonDataQuery(
  //   `${params?.slug}/${selectedLesson?.slug}`
  // );

  // modal functions

  const closeModal = () => {
    dispatch(setSelectedLesson({}));
    setIsModalOpen(false);
  };

  const closeAddLessonModal = () => {
    setAddLessonData({});
    setAddLessonModalOpen(false);
    setProgress(0);
  };

  const openAddLessonModal = () => {
    setAddLessonModalOpen(true);
  };
  const openModal = async (lesson: any) => {
    dispatch(setSelectedLesson(lesson));

    const res: any = await dispatch(
      courseApi.endpoints.getLessonData.initiate(
        `${params?.slug}/${lesson?.slug}`
      )
    );

    if (res?.data) {
      setLessonData(res?.data);
    }

    setIsModalOpen(true);
  };

  // edit course functions

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setEditData({ ...editData, ['file']: file });
  };

  const handleInputChange = (e: any) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEdit = async (): Promise<void> => {
    const formData = new FormData();
    if (editData?.file) {
      formData.append('file', editData?.file);
    }
    if (editData?.name) {
      formData.append('name', editData?.name);
    }
    if (editData?.description) {
      formData.append('description', editData?.description);
    }

    const response: any = await editCourse({
      slug: params?.slug,
      data: formData,
    });

    if (response?.data?.success) {
      push('/user/instructor');
    }
  };

  //add lesson functions
  const handleVideoInputChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setAddLessonData({ ...addLessonData, [e.target.name]: selectedFile });
    }
  };
  const handleAddLessonInputChange = (e: any) => {
    /* console.log(e.target.value); */
    if (e.target.name) {
      setAddLessonData({ ...addLessonData, [e.target.name]: e.target.value });
    } else {
      setAddLessonData({ ...addLessonData, ['title']: e.target.value });
    }
  };

  const handleAddLesson = async () => {
    setIsLessonAdding(true);
    const formData = new FormData();
    if (addLessonData?.file) {
      formData.append('file', addLessonData?.file);
    }
    if (addLessonData?.title) {
      formData.append('title', addLessonData?.title);
    }
    if (addLessonData?.content) {
      formData.append('content', addLessonData?.content);
    }

    const response = await axios.post(
      process.env.BACKEND_ENDPOINT+`/course/addLesson/${params.slug}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
        onUploadProgress: (e) => {
          setProgress(Math.round((100 * e.loaded) / e.total));
        },
      }
    );

    if (response?.data?.success) {
      closeAddLessonModal();
      setIsLessonAdding(false);
      refetch();
    }
  };

  // edit lesson functions

  const handleLessonVideoInputChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setEditLesson({ ...editLesson, [e.target.name]: selectedFile });
    }
  };

  const handleLessonInputChange = (e: any) => {
    setEditLesson({ ...editLesson, [e.target.name]: e.target.value });
  };

  const handleDeleteLesson = async (lesson: any) => {
    // if (
    //   window.confirm(`Are you really want to delete lesson ${lesson?.title}?`)
    // ) {
    const response: any = await deleteLesson(
      `${params?.slug}/${selectedLesson?.slug}`
    );

    if (response?.data?.success) {
      // alert(`${lesson?.title} deleted successfully!`);
      refetch();
      closeModal();
    }
    // }
  };

  const handleEditLesson = async (lesson) => {
    const formData = new FormData();
    if (editLesson?.file) {
      formData.append('file', editLesson?.file);
    }
    if (editLesson?.title) {
      formData.append('title', editLesson?.title);
    }
    if (editLesson?.content) {
      formData.append('content', editLesson?.content);
    }

    const response = await axios.put(
      process.env.BACKEND_ENDPOINT+`/course/updateLesson/${params.slug}/${selectedLesson?.slug}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
        onUploadProgress: (e) => {
          setProgress(Math.round((100 * e.loaded) / e.total));
        },
      }
    );
    // const response: any = await editingLesson({
    //   slug: `${params?.slug}/${selectedLesson?.slug}`,
    //   data: formData,
    // });

    if (response?.data?.success) {
      refetch();
      closeModal();
    }
  };

  // tags functions

  const handleTagSelect = async (event: any) => {
    const tagSlug = JSON.parse(event.target.value).slug;

    const response: any = await addCourseToTag({
      slug: tagSlug,
      data: { courseSlug: params.slug },
    });

    if (response?.data) {
      /* console.log(response, 'tag res'); */
    }
  };
  // all useEffecs

  useEffect(() => {
    if (data) {
      setEditData({
        ...editData,
        name: data?.name,
        description: data?.description,
        file: data?.image,
      });
    }
    if (lessonData) {
      setEditLesson({
        ...editLesson,
        title: lessonData?.title,
        content: lessonData?.content,
        file: lessonData?.video,
      });
    }
  }, [data, lessonData]);

  // console.log(allTags, 'all tags');

  return (
    <ChakraProvider>
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
        Edit Course
      </Text>
      <Box p={8} mt={20}>
        <VStack spacing={4} align='center'>
          <Text>Informazioni sul corso</Text>
          <Input
            placeholder='Titolo del corso'
            w='300px'
            value={editData?.name}
            onChange={handleInputChange}
            name='name'
          />
          <Input
            placeholder='Descrizione del corso'
            w='300px'
            value={editData?.description}
            onChange={handleInputChange}
            name='description'
          />
          <TagsField
            id='tags-field'
            label='Tag'
            mb='0px'
            h='140px'
            placeholderTags={courseTags}
            courseSlug={params?.slug}
          />
          <Select
            placeholder='Seleziona un tag del corso'
            w='300px'
            onChange={handleTagSelect}
          >
            {allTags &&
              allTags.length > 0 &&
              allTags.map((tag, idx) => (
                <option key={idx} value={JSON.stringify(tag)}>
                  {tag?.name}
                </option>
              ))}
          </Select>

          <Text>Immagine del corso</Text>
          <Flex align='center' mt={4}>
            <Image
              src={
                typeof editData?.file === 'object'
                  ? URL.createObjectURL(editData?.file)
                  : editData?.file
              }
              alt='Immagine del corso'
              w={100}
              h={100}
              objectFit='cover'
            />
          </Flex>

          <Flex align='center' mt={4}>
            <Input
              type='file'
              onChange={handleImageChange}
              accept='image/*'
              name='file'
            />
            <IconButton
              icon={<FaTrash />}
              aria-label='Rimuovi Immagine'
              colorScheme='red'
              ml={2}
            />
          </Flex>

          <HStack spacing={4} justify='center'>
            <Button colorScheme='teal' onClick={openAddLessonModal}>
              Aggiungi Lezione
            </Button>
            <Button
              colorScheme='teal'
              onClick={handleEdit}
              isDisabled={
                !editData?.name || !editData?.description || !editData?.file
              }
              isLoading={editing}
            >
              Salva Modifiche
            </Button>
          </HStack>

          <VStack spacing={4} align='center'>
            {data?.lessons.length > 0 &&
              data?.lessons.map((lesson: any, idx: any) => (
                <Flex
                  key={lesson._id}
                  p={4}
                  w='300px'
                  bg='gray.100'
                  borderRadius='md'
                  justifyContent='space-between'
                >
                  <Text cursor='pointer'>{lesson.title}</Text>
                  <IconButton
                    icon={<MdSettings />}
                    aria-label='Delete Lesson'
                    onClick={() => openModal(lesson)}
                  />
                </Flex>
              ))}
          </VStack>
        </VStack>
        <Modal isOpen={isModalOpen} size='xl' onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text>Dettagli della lezione</Text>
              <Text color='gray' fontSize='14px'>
                {' '}
                Qua puoi modificare i dettagli della lezione
              </Text>
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              {/* {selectedLesson?.videoUrl && (
                <video width='100%' controls>
                  <source src={selectedLesson.videoUrl} type='video/mp4' />
                  Il tuo browser non supporta il tag video.
                </video>
              )} */}

              <Flex direction='column' mt={2} align='center'>
                {/* <Details /> */}
                <FormControl>
                  <Flex direction='column'>
                    <Flex direction='column' mb='20px'>
                      <FormLabel
                        display='flex'
                        ms='10px'
                        htmlFor='title'
                        fontSize='sm'
                        color={textColorPrimary}
                        fontWeight='bold'
                        _hover={{ cursor: 'pointer' }}
                      >
                        Titolo
                      </FormLabel>
                      <Input
                        type='text'
                        id='title'
                        name='title'
                        value={editLesson?.title}
                        onChange={handleLessonInputChange}
                        fontWeight='500'
                        variant='main'
                        placeholder='Lezione 1'
                        _placeholder={{
                          fontWeight: '400',
                          color: 'secondaryGray.600',
                        }}
                        h='44px'
                        maxH='44px'
                      />
                    </Flex>
                    <Text>Descrizione:</Text>
                    <Textarea
                      name='content'
                      value={editLesson?.content}
                      onChange={handleLessonInputChange}
                      placeholder='Inserisci qui la descrizione della lezione'
                      size='sm'
                    />
                  </Flex>
                </FormControl>

                {/* <Dropzone onChange={(e: any) => handleVideoUpload(e)} /> */}

                {/* video content */}

                <Card p='30px' w='100%' mt='10px'>
                  <Text
                    color={textColor}
                    fontSize='xl'
                    fontWeight='700'
                    mb='30px'
                  >
                    Video
                  </Text>

                  <Box
                    as='video'
                    controls
                    src={
                      typeof editLesson?.file === 'object'
                        ? URL.createObjectURL(editLesson?.file)
                        : editLesson?.file
                    }
                    // poster='https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217'
                    objectFit='contain'
                    sx={{
                      aspectRatio: '16/9',
                    }}
                  />

                  <Input
                    type='file'
                    display='none'
                    ref={lessonVideoInputRef}
                    accept='video/*'
                    name='file'
                    onChange={handleLessonVideoInputChange}
                  />
                  <Button onClick={() => lessonVideoInputRef.current.click()}>
                    Change Video
                  </Button>
                </Card>

                {/* {selectedLesson?.videoProgress === 100 && (
                  <IconButton
                    icon={<FaTrash />}
                    aria-label='Rimuovi Video'
                    colorScheme='red'
                    onClick={() =>
                      setSelectedLesson({
                        ...selectedLesson,
                        videoProgress: null,
                      })
                    }
                    ml={2}
                  />
                )}
                {selectedLesson?.videoProgress && (
                  <Box ml={2}>
                    <CircularProgress
                      value={selectedLesson.videoProgress}
                      size='32px'
                      color='teal.400'
                    />
                  </Box>
                )} */}
              </Flex>
              <Progress hasStripe value={progress} mt='10px' />
            </ModalBody>

            <ModalFooter>
              <Delete
                handleDeleteLesson={handleDeleteLesson}
                handleEditLesson={handleEditLesson}
                editLesson={editLesson}
                deleting={deleting}
                lessonEditing={lessonEditing}
              />
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal
          isOpen={addLessonModalOpen}
          size='xl'
          onClose={closeAddLessonModal}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text>Add Lesson</Text>
              <Text color='gray' fontSize='14px'>
                {' '}
                Here you can add lesson
              </Text>
            </ModalHeader>
            <ModalCloseButton />

            {/* <Icon as={MdSettings} /> */}
            <ModalBody>
              <Flex direction='column' mt={2} align='center'>
                {/* <Details /> */}
                {/* <Dropzone onChange={(e: any) => handleVideoUpload(e)} /> */}

                {/* video input */}

                <FormControl>
                  <Flex direction='column'>
                    <InputField
                      type='text'
                      mb='20px'
                      id='title'
                      label='Titolo'
                      placeholder='Lezione 1'
                      onChange={handleAddLessonInputChange}
                    />
                    <Text>Descrizione:</Text>
                    <Textarea
                      placeholder='Inserisci qui la descrizione della lezione'
                      size='sm'
                      onChange={handleAddLessonInputChange}
                      name='content'
                    />
                  </Flex>
                </FormControl>

                <Card p='30px' w='100%' mt='10px'>
                  <Text
                    color={textColor}
                    fontSize='xl'
                    fontWeight='700'
                    mb='30px'
                  >
                    Video
                  </Text>
                  <Input
                    type='file'
                    display='none'
                    ref={inputRef}
                    accept='video/*'
                    name='file'
                    onChange={handleVideoInputChange}
                  />

                  {addLessonData?.file && (
                    <video width='100%' controls>
                      <source
                        src={URL.createObjectURL(addLessonData?.file)}
                        type='video/mp4'
                      />
                    </video>
                  )}

                  {!addLessonData?.file && (
                    <Button onClick={() => inputRef.current.click()}>
                      Choose Video
                    </Button>
                  )}
                </Card>

                {/* video input */}
              </Flex>
              <Progress hasStripe value={progress} mt='10px' />
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={handleAddLesson}
                isDisabled={
                  !addLessonData?.file ||
                  !addLessonData?.content ||
                  !addLessonData?.title
                }
                isLoading={isLessonAdding}
              >
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
}
