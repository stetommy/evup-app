'use client';

import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

import Dropzone from 'components/admin/main/ecommerce/settings-product/DropzoneCard';
import Delete from 'components/admin/main/ecommerce/settings-product/Delete';
import Details from 'components/admin/main/ecommerce/settings-product/Details';
import TagsField from 'components/fields/TagsField';
import { authToken } from 'variables/AuthToken';

const initialLessons = [
  { id: 'lesson1', content: 'Lezione 1' },
  { id: 'lesson2', content: 'Lezione 2' },
  { id: 'lesson3', content: 'Lezione 3' },
];



export default function EditCourse() {
  const [lessons, setLessons] = useState(initialLessons);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseImage, setCourseImage] = useState(
    'https://cdn.elearningindustry.com/wp-content/uploads/2020/08/5-ways-to-improve-your-course-cover-design-1024x575.png'
  );

  const openModal = (lesson) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedLesson(null);
    setIsModalOpen(false);
  };

  const handleLessonUpdate = (updatedContent) => {
    const updatedLessons = lessons.map((lesson) =>
      lesson.id === selectedLesson.id
        ? { ...lesson, content: updatedContent }
        : lesson
    );
    setLessons(updatedLessons);
    closeModal();
  };

  const handleLessonDelete = () => {
    const updatedLessons = lessons.filter(
      (lesson) => lesson.id !== selectedLesson.id
    );
    setLessons(updatedLessons);
    closeModal();
  };

  const handleAddLesson = () => {
    const newLesson = {
      id: `lesson${lessons.length + 1}`,
      content: `Lezione ${lessons.length + 1}`,
    };
    setLessons([...lessons, newLesson]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCourseImage('url');
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e) => {};

  return (
    <ChakraProvider>
      <Box p={8} mt={20}>
        <VStack spacing={4} align='center'>
          <Text>Informazioni sul corso</Text>
          <Input placeholder='Titolo del corso' w='300px' />
          <Input placeholder='Descrizione del corso' w='300px' />
          <TagsField
            id='tags-field'
            label='Tag'
            mb='0px'
            h='140px'
            placeholderTags={[
              {
                name: 'chair',
                id: 1,
              },
              {
                name: 'furniture',
                id: 2,
              },
              {
                name: 'elegant',
                id: 3,
              },
            ]}
          />
          <Select placeholder='Seleziona un tag del corso' w='300px'>
            <option value='tag1'>Tag 1</option>
            <option value='tag2'>Tag 2</option>
            <option value='tag3'>Tag 3</option>
          </Select>

          <Text>Immagine del corso</Text>
          <Flex align='center' mt={4}>
            <Image
              src={courseImage}
              alt='Immagine del corso'
              w={100}
              h={100}
              objectFit='cover'
            />
          </Flex>

          <Flex align='center' mt={4}>
            <Input type='file' onChange={handleImageChange} />
            <IconButton
              icon={<FaTrash />}
              aria-label='Rimuovi Immagine'
              colorScheme='red'
              ml={2}
            />
          </Flex>

          <HStack spacing={4} justify='center'>
            <Button colorScheme='teal' onClick={handleAddLesson}>
              Aggiungi Lezione
            </Button>
            <Button colorScheme='teal'>Salva Modifiche</Button>
          </HStack>

          <VStack spacing={4} align='center'>
            {lessons.map((lesson) => (
              <Flex
                key={lesson.id}
                p={4}
                w='300px'
                bg='gray.100'
                borderRadius='md'
                justifyContent='space-between'
              >
                <Text onClick={() => openModal(lesson)} cursor='pointer'>
                  {lesson.content}
                </Text>
                <IconButton
                  icon={<FaTrash />}
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
              {/* <Input
                placeholder='Contenuto della lezione'
                value={selectedLesson?.content}
                onChange={(e) =>
                  setSelectedLesson({
                    ...selectedLesson,
                    content: e.target.value,
                  })
                }
              />
              <Input
                placeholder='Descrizione della lezione'
                mt={2}
                value={selectedLesson?.description}
                onChange={(e) =>
                  setSelectedLesson({
                    ...selectedLesson,
                    description: e.target.value,
                  })
                }
              /> */}
              {selectedLesson?.videoUrl && (
                <video width='100%' controls>
                  <source src={selectedLesson.videoUrl} type='video/mp4' />
                  Il tuo browser non supporta il tag video.
                </video>
              )}

              <Flex direction='column' mt={2} align='center'>
                <Details />
                <Dropzone onChange={(e: any) => handleVideoUpload(e)} />

                {selectedLesson?.videoProgress === 100 && (
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
                )}
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Delete />
              {/* <Button
                colorScheme='blue'
                mr={3}
                onClick={() => handleLessonUpdate(selectedLesson.content)}
              >
                Salva
              </Button>
              <Button colorScheme='red' onClick={handleLessonDelete}>
                Elimina
              </Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
}
