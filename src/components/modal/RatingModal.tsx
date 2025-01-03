import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

const RatingModal = ({ isRatingModalOpen, setIsRatingModalOpen }: any) => {
  
  /* console.log(isRatingModalOpen, 'raa'); */
  const handleClose = () => {
    /* console.log('clicked'); */
    setIsRatingModalOpen(false);
  };
  return (
    <>
      <Modal isOpen={isRatingModalOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{/* <Lorem count={2} /> */}</ModalBody>
          <ModalFooter>
            <Button
              colorScheme='brand'
              mr={3}
              onClick={() => setIsRatingModalOpen(false)}
            >
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RatingModal;
