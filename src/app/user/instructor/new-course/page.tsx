'use client';

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  Stack,
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
import InputField from 'components/fields/InputField';
import TextField from 'components/fields/TextField';
import TagsField from 'components/fields/TagsField';
import Dropzone from 'components/admin/main/ecommerce/new-product/Dropzone';
import React, { useState } from 'react';

// Assets
import { MdOutlineCloudUpload } from 'react-icons/md';
import { authToken } from 'variables/AuthToken';
import { useRouter } from 'next/navigation';
//import { apiRequest } from 'features/middleware/utils';
import { useCreateCourseMutation } from 'features/course/courseApi';

export default function NewProduct() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const [activeBullets, setActiveBullets] = useState({
    product: true,
    media: false,
    pricing: false,
  });

  const productTab: any = React.useRef();
  const mediaTab: any = React.useRef();
  const pricingTab: any = React.useRef();
  // const productTab = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  // const mediaTab = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  // const pricingTab = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const brand = useColorModeValue('brand.500', 'brand.400');

  const [createCourse, { isLoading }] = useCreateCourseMutation();

  const [courseData, setCourseData] = useState<any>({});

  const { push } = useRouter();

  const handleInputValueChange = (e: any): void => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (file: any): void => {
    setCourseData({ ...courseData, file: file });
  };

  const handleSubmit = async (): Promise<void> => {
    const formData = new FormData();
    formData.append('file', courseData?.file);
    formData.append('name', courseData?.name);
    formData.append('description', courseData?.description);
    const response: any = await createCourse(formData);
    /* console.log(response, 'res'); */

    if (response?.data?.success) {
      push('/user/instructor');
    }
  };

  /* console.log(courseData, 'course'); */

  return (
    <Flex
      direction='column'
      minH='100vh'
      align='center'
      pt={{ sm: '125px', lg: '75px' }}
      position='relative'
    >
      <Box
        h='45vh'
        bgGradient='linear(to-b, brand.400, brand.600)'
        position='absolute'
        w='100%'
        borderRadius='30px'
      />

      <Tabs
        variant='unstyled'
        mt={{ base: '60px', md: '165px' }}
        zIndex='0'
        display='flex'
        flexDirection='column'
      >
        {/* <TabList
          display='flex'
          alignItems='center'
          alignSelf='center'
          justifySelf='center'
        >
          <Tab
            _focus={{ border: '0px', boxShadow: 'unset' }}
            ref={productTab}
            w={{ sm: '120px', md: '250px', lg: '300px' }}
            onClick={() =>
              setActiveBullets({
                product: true,
                media: false,
                pricing: false,
              })
            }
          >
            <Flex
              direction='column'
              justify='center'
              align='center'
              position='relative'
              _before={{
                content: "''",
                width: { sm: '120px', md: '250px', lg: '300px' },
                height: '3px',
                bg: activeBullets.media ? 'white' : '#8476FF',
                left: { sm: '12px', md: '40px' },
                top: {
                  sm: activeBullets.product ? '6px' : '4px',
                  md: null,
                },
                position: 'absolute',
                bottom: activeBullets.product ? '40px' : '38px',

                transition: 'all .3s ease',
              }}
            >
              <Box
                zIndex='1'
                border='2px solid'
                borderColor={activeBullets.product ? 'white' : 'brand.400'}
                bgGradient='linear(to-b, brand.400, brand.600)'
                w='16px'
                h='16px'
                mb='8px'
                borderRadius='50%'
              />
              <Text
                color={activeBullets.product ? 'white' : 'gray.300'}
                fontWeight={activeBullets.product ? 'bold' : 'normal'}
                display={{ sm: 'none', md: 'block' }}
              >
                Info Corso
              </Text>
            </Flex>
          </Tab>
          <Tab
            _focus={{ border: '0px', boxShadow: 'unset' }}
            ref={mediaTab}
            w={{ sm: '120px', md: '250px', lg: '300px' }}
            onClick={() =>
              setActiveBullets({
                product: true,
                media: true,
                pricing: false,
              })
            }
          >
            <Flex
              direction='column'
              justify='center'
              align='center'
              position='relative'
              _before={{
                content: "''",
                width: { sm: '120px', md: '250px', lg: '300px' },
                height: '3px',
                bg: activeBullets.pricing ? 'white' : '#8476FF',
                left: { sm: '12px', md: '28px' },
                top: '6px',
                position: 'absolute',
                bottom: activeBullets.media ? '40px' : '38px',

                transition: 'all .3s ease',
              }}
            >
              <Box
                zIndex='1'
                border='2px solid'
                borderColor={activeBullets.media ? 'white' : 'brand.400'}
                bgGradient='linear(to-b, brand.400, brand.600)'
                w='16px'
                h='16px'
                mb='8px'
                borderRadius='50%'
              />
              <Text
                color={activeBullets.media ? 'white' : 'gray.300'}
                fontWeight={activeBullets.media ? 'bold' : 'normal'}
                display={{ sm: 'none', md: 'block' }}
              >
                Media
              </Text>
            </Flex>
          </Tab>
          <Tab
            _focus={{ border: '0px', boxShadow: 'unset' }}
            ref={pricingTab}
            w={{ sm: '120px', md: '250px', lg: '300px' }}
            onClick={() =>
              setActiveBullets({
                product: true,
                media: true,
                pricing: true,
              })
            }
          >
            <Flex
              direction='column'
              justify='center'
              align='center'
              position='relative'
            >
              <Box
                zIndex='1'
                border='2px solid'
                borderColor={activeBullets.pricing ? 'white' : 'brand.400'}
                bgGradient='linear(to-b, brand.400, brand.600)'
                w='16px'
                h='16px'
                mb='8px'
                borderRadius='50%'
              />
              <Text
                color={activeBullets.pricing ? 'white' : 'gray.300'}
                fontWeight={activeBullets.pricing ? 'bold' : 'normal'}
                display={{ sm: 'none', md: 'block' }}
              >
                Pricing
              </Text>
            </Flex>
          </Tab>
        </TabList> */}
        <TabPanels mt='24px' maxW={{ md: '90%', lg: '100%' }} mx='auto'>
          <TabPanel
            w={{ sm: '330px', md: '700px', lg: '850px' }}
            p='0px'
            mx='auto'
          >
            <Card p='30px'>
              <Text color={textColor} fontSize='2xl' fontWeight='700' mb='20px'>
                Informazioni del corso
              </Text>
              <Flex direction='column' w='100%'>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap='20px'>
                  <Stack direction='column' gap='20px'>
                    <InputField
                      mb='0px'
                      id='name'
                      placeholder='es. Corso 1'
                      label='Titolo del corso'
                      onChange={handleInputValueChange}
                      name='name'
                    />
                    {/* <InputField
                      mb='0px'
                      id='weight'
                      placeholder='eg. 20kg'
                      label='Weight'
                      onChange={handleInputValueChange}
                    /> */}
                    {/* <InputField
                      mb='0px'
                      id='Color'
                      placeholder='eg. Purple'
                      label='Color'
                      onChange={handleInputValueChange}
                    /> */}
                  </Stack>
                  <Stack direction='column' gap='20px'>
                    {/* <InputField
                      onChange={handleInputValueChange}
                      mb='0px'
                      id='Collection'
                      placeholder='eg. Classics'
                      label='Collection'
                    /> */}
                    <TextField
                      h='146px'
                      mb='0px'
                      id='Description'
                      placeholder='Short description about the product'
                      label='Description'
                      onChange={handleInputValueChange}
                    />
                  </Stack>
                </SimpleGrid>
                {/* <Flex justify='space-between' mt='24px'>
                  <Button
                    variant='darkBrand'
                    fontSize='sm'
                    borderRadius='16px'
                    w={{ base: '128px', md: '148px' }}
                    h='46px'
                    ms='auto'
                    onClick={() => mediaTab.current.click()}
                  >
                    Next
                  </Button>
                </Flex> */}
              </Flex>
              <Dropzone
                mt='24px'
                content={
                  <Box>
                    <Icon
                      as={MdOutlineCloudUpload}
                      w='80px'
                      h='80px'
                      color={textColor}
                    />
                    <Text
                      mx='auto'
                      mb='12px'
                      fontSize='lg'
                      fontWeight='700'
                      whiteSpace='pre-wrap'
                      color={textColor}
                    >
                      Drop your files here, or{' '}
                      <Text
                        as='span'
                        fontSize='lg'
                        fontWeight='700'
                        color={brand}
                      >
                        browse
                      </Text>
                    </Text>
                    <Text
                      fontSize='sm'
                      fontWeight='500'
                      color='secondaryGray.500'
                    >
                      PNG, JPG and GIF files are allowed
                    </Text>
                  </Box>
                }
                onChange={handleFileChange}
              />
              <Flex justify='center' mt='24px'>
                <Button
                  variant='darkBrand'
                  fontSize='sm'
                  borderRadius='16px'
                  w={{ base: '128px', md: '148px' }}
                  h='46px'
                  onClick={handleSubmit}
                  isDisabled={
                    !courseData?.file ||
                    !courseData?.name ||
                    !courseData?.description
                  }
                  isLoading={isLoading}
                >
                  Submit
                </Button>
              </Flex>
            </Card>
          </TabPanel>
          {/* <TabPanel
            w={{ sm: '330px', md: '700px', lg: '850px' }}
            p='0px'
            mx='auto'
          >
            <Card p='30px'>
              <Text color={textColor} fontSize='2xl' fontWeight='700' mb='20px'>
                Media
              </Text>
              <Dropzone
                content={
                  <Box>
                    <Icon
                      as={MdOutlineCloudUpload}
                      w='80px'
                      h='80px'
                      color={textColor}
                    />
                    <Text
                      mx='auto'
                      mb='12px'
                      fontSize='lg'
                      fontWeight='700'
                      whiteSpace='pre-wrap'
                      color={textColor}
                    >
                      Drop your files here, or{' '}
                      <Text
                        as='span'
                        fontSize='lg'
                        fontWeight='700'
                        color={brand}
                      >
                        browse
                      </Text>
                    </Text>
                    <Text
                      fontSize='sm'
                      fontWeight='500'
                      color='secondaryGray.500'
                    >
                      PNG, JPG and GIF files are allowed
                    </Text>
                  </Box>
                }
                onChange={handleFileChange}
              />
              <Flex justify='space-between' mt='24px'>
                <Button
                  variant='light'
                  fontSize='sm'
                  borderRadius='16px'
                  w={{ base: '128px', md: '148px' }}
                  h='46px'
                  onClick={() => productTab.current.click()}
                >
                  Prev
                </Button>
                <Button
                  variant='darkBrand'
                  fontSize='sm'
                  borderRadius='16px'
                  w={{ base: '128px', md: '148px' }}
                  h='46px'
                  onClick={() => pricingTab.current.click()}
                >
                  Next
                </Button>
              </Flex>
            </Card>
          </TabPanel> */}
          <TabPanel
            w={{ sm: '330px', md: '700px', lg: '850px' }}
            p='0px'
            mx='auto'
          >
            <Card p='30px'>
              <Text color={textColor} fontSize='2xl' fontWeight='700' mb='20px'>
                Pricing
              </Text>
              <Flex direction='column' w='100%'>
                <Stack direction='column' spacing='20px'>
                  <SimpleGrid
                    columns={{ base: 1, md: 3 }}
                    gap={{ base: '0px', md: '20px' }}
                  >
                    <InputField
                      id='price'
                      placeholder='eg. $99'
                      label='Price'
                      onChange={handleInputValueChange}
                    />
                    <InputField
                      id='code'
                      placeholder='eg. 4030120241'
                      label='Unique Code'
                      onChange={handleInputValueChange}
                    />
                    <Flex direction='column' mb='34px'>
                      <FormLabel
                        ms='10px'
                        htmlFor='currency'
                        fontSize='sm'
                        color={textColor}
                        fontWeight='bold'
                        _hover={{ cursor: 'pointer' }}
                      >
                        Currency
                      </FormLabel>
                      <Select
                        fontSize='sm'
                        id='currency'
                        variant='main'
                        h='44px'
                        maxH='44px'
                        defaultValue='usd'
                      >
                        <option value='usd'>USD</option>
                        <option value='eur'>EUR</option>
                        <option value='gbp'>GBP</option>
                      </Select>
                    </Flex>
                  </SimpleGrid>
                  <TagsField />
                </Stack>
                <Flex justify='space-between' mt='24px'>
                  <Button
                    variant='light'
                    fontSize='sm'
                    borderRadius='16px'
                    w={{ base: '128px', md: '148px' }}
                    h='46px'
                    onClick={() => mediaTab.current.click()}
                  >
                    Prev
                  </Button>
                  <Button
                    variant='darkBrand'
                    fontSize='sm'
                    borderRadius='16px'
                    w={{ base: '128px', md: '148px' }}
                    h='46px'
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Flex>
              </Flex>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
