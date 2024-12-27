'use client';

// Chakra imports
import { Button, Flex, Input, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import { NextAvatar } from 'components/image/Avatar';
import { Image } from 'components/image/Image';
import { authApi, useChangeImageMutation } from 'features/auth/authApi';
import { userLoggedIn } from 'features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FiUpload } from 'react-icons/fi';

export default function Settings(props: {
  name: string;
  avatar: string;
  banner: string;
}) {
  const { name, avatar, banner } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const [changeImage, { isLoading }] = useChangeImageMutation();
  const [choosenImage, setChoosenImage] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogOut = async () => {
    // logout();
    dispatch(userLoggedIn(null));
    const response = await dispatch<any>(
      authApi.endpoints.logOut.initiate(null)
    );
    if (response?.data?.success) {
      router.push('/auth/sign-in');
    }
  };

  const handleImageChange = (e: any) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setChoosenImage(selectedImage);
    }
  };

  const handleUpdateImage = async () => {
    const formData = new FormData();
    formData.append('file', choosenImage);
    const response: any = await changeImage(formData);
    if (response?.data?.success) {
      handleLogOut();
    }
  };
  return (
    <Card mb='20px' alignItems='center'>
      <Image src={banner} borderRadius='16px' alt='' />
      <NextAvatar
        mx='auto'
        src={avatar}
        h='87px'
        w='87px'
        mt='-43px'
        mb='15px'
      />
      <Text fontSize='2xl' textColor={textColorPrimary} fontWeight='700'>
        {name}
      </Text>

      <Input
        type='file'
        accept='image/*'
        display='none'
        id='imageInput'
        colorScheme='blackAlpha'
        onChange={handleImageChange}
      />
      <label htmlFor='imageInput'>
        <Flex
          direction='column'
          align='center'
          cursor='pointer'
          borderWidth='2px'
          borderRadius='md'
          borderColor='blackAlpha.300'
          p='2'
          mt='6'
        >
          <FiUpload size={24} /> {/* Icona di upload */}
          <Text mt='2'>Seleziona un&apos;immagine</Text>
        </Flex>
      </label>

      <Button
        variant='brand'
        minW='183px'
        fontSize='sm'
        fontWeight='500'
        ms='auto'
        isDisabled={!choosenImage}
        mt='6'
        mb='1'
        isLoading={isLoading}
        onClick={handleUpdateImage}
      >
        Carica
      </Button>
    </Card>
  );
}
