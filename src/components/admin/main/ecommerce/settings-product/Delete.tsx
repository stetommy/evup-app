'use client';
// Chakra imports
import { Button, LightMode } from '@chakra-ui/react';

export default function Settings({
  handleDeleteLesson,
  handleEditLesson,
  editLesson,
  deleting,
  lessonEditing,
}: any) {
  // Chakra Color Mode
  return (
    <>
      <LightMode>
        <Button
          colorScheme='red'
          variant='outline'
          p='15px 40px'
          fontSize='sm'
          fontWeight='500'
          ms={{ base: '0', md: 'auto' }}
          mb={{ base: '20px', md: '0' }}
          me={{ base: '0', md: '20px' }}
          _hover={{ bg: 'whiteAlpha.100' }}
          _focus={{ bg: 'transparent' }}
          _active={{ bg: 'transparent' }}
          onClick={() => handleDeleteLesson(editLesson)}
          isLoading={deleting}
        >
          Elimina lezione
        </Button>
      </LightMode>
      <Button
        variant='brand'
        minW='183px'
        fontSize='sm'
        fontWeight='500'
        onClick={() => handleEditLesson(editLesson)}
        isLoading={lessonEditing}
      >
        Salva
      </Button>
    </>
  );
}
