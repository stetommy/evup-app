'use client';
// Chakra imports
import { Button, Flex, Image, useColorModeValue } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
// Assets

function Dropzone(props: {
  content: JSX.Element | string;
  [x: string]: any;
  onChange: any;
}) {
  const { content, onChange, ...rest } = props;
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone();
  const bg = useColorModeValue('gray.100', 'navy.700');
  const borderColor = useColorModeValue('gray.300', 'whiteAlpha.100');

  useEffect(() => {
    onChange(acceptedFiles[0]);
  }, [acceptedFiles]);
  return (
    <>
      <Flex
        align='center'
        justify='center'
        bg={bg}
        border='1px dashed'
        borderColor={borderColor}
        borderRadius='16px'
        w='100%'
        maxW='100%'
        h='max-content'
        minH='130px'
        cursor='pointer'
        {...getRootProps({ className: 'dropzone' })}
        onChange={onChange}
        pt='80px !important'
        pb='105px !important'
        {...rest}
      >
        <input {...getInputProps()} />
        {acceptedFiles.length > 0 ? (
          <Image
            objectFit='contain'
            src={URL.createObjectURL(acceptedFiles[0])}
            alt='Segun Adebayo'
          />
        ) : (
          <Button variant='no-effects'>{content}</Button>
        )}
      </Flex>
    </>
  );
}

export default Dropzone;
