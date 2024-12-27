'use client';
// Chakra imports
import {
  Flex,
  Box,
  FormLabel,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { useRemoveCourseFromTagMutation } from 'features/tags/tagsApi';

function TagsField(props: {
  label?: string;
  id?: string;
  placeholderTags?: { name: string; id: number }[];
  courseSlug?: any;
  [x: string]: any;
}) {
  const { label, id, courseSlug, placeholderTags, ...rest } = props;

  const borderColor = useColorModeValue('secondaryGray.100', 'whiteAlpha.100');
  const bg = useColorModeValue('brand.500', 'brand.400');

  const [removeCourseFromTag, { isLoading }] = useRemoveCourseFromTagMutation();

  const handleRemoveTag = async (tagSlug: any) => {
    await removeCourseFromTag({
      slug: tagSlug,
      data: { courseSlug: courseSlug },
    });
    /* console.log(response, 'ree ress'); */
  };

  /* console.log(placeholderTags, 'plasee'); */
  return (
    <Box>
      <FormLabel htmlFor={id} fontWeight='bold' fontSize='sm' mb='8px'>
        {label}
      </FormLabel>
      <Flex
        direction='row'
        p='12px'
        wrap='wrap'
        bg='transparent'
        border='1px solid'
        borderColor={borderColor}
        borderRadius='16px'
        _focus={{ borderColor: 'teal.300' }}
        // minH='40px'
        w='300px'
        h='stretch'
        cursor='text'
        {...rest}
      >
        {placeholderTags && placeholderTags.length > 0 ? (
          placeholderTags?.map((tag: any, index) => {
            return (
              <Tag
                fontSize='xs'
                h='25px'
                mb='6px'
                me='6px'
                borderRadius='12px'
                variant='solid'
                bg={'teal.400'}
                key={index}
              >
                <TagLabel w='100%'>{tag?.name}</TagLabel>
                <TagCloseButton
                  justifySelf='flex-end'
                  color='white'
                  onClick={() => handleRemoveTag(tag?.slug)}
                />
              </Tag>
            );
          })
        ) : (
          <Text></Text>
        )}
      </Flex>
    </Box>
  );
}

export default TagsField;
