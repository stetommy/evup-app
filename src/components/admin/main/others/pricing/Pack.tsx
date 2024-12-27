'use client';
// Chakra imports
import {
  Badge,
  List,
  ListItem,
  ListIcon,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import { useBuyPlansMutation } from 'features/plans/plansAPi';
import { useRouter } from 'next/navigation';
// Assets
import { BsCircleFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';

export default function Pack(props: {
  title: string;
  desc: string;
  button: string;
  price: JSX.Element | string;
  details: string;
  benefits: string[];
  highlighted?: boolean;
  index?: number;
  slug?: string;
}) {
  const {
    title,
    desc,
    button,
    price,
    details,
    benefits,
    highlighted,
    index,
    slug,
  } = props;
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const router = useRouter();

  const { user } = useSelector((state: any) => state.auth);

  const [buyPlans, { isLoading }] = useBuyPlansMutation();

  const handleBuyPlan = async () => {
    // if (window.confirm(`Are you really want to buy ${title}?`)) {
    const response: any = await buyPlans(`${user?.email}/${slug}`);
    if (response?.data?.success) {
      if (response?.data?.url) {
        router.push(response?.data?.url);
      }
      // }
    }
  };
  return (
    <Card
      p='20px'
      pb='45px'
      pt={highlighted ? '60px' : '30px'}
      w={{ sm: '300px', md: '650px', lg: '375px' }}
      alignItems='flex-start'
      justifyContent='flex-start'
      overflow='unset !important'
    >
      {index === 1 && (
        <Badge
          display={highlighted ? 'block' : 'none'}
          w='max-content'
          position='absolute'
          fontSize='sm'
          color='orange.500'
          bg='orange.100'
          fontWeight='bold'
          textTransform='unset'
          left='50%'
          borderRadius='70px'
          transform='translate(-50%,-250%)'
        >
          Piano più popolare
        </Badge>
      )}
      <Text fontSize='30px' color={textColor} fontWeight='700'>
        {title}
      </Text>
      <Text mb='30px' fontSize='md' color='secondaryGray.600' fontWeight='500'>
        {desc}
      </Text>
      <Button
        w='100%'
        variant={highlighted ? 'brand' : 'lightBrand'}
        mb='30px'
        onClick={handleBuyPlan}
        isLoading={isLoading}
      >
        {button}
      </Button>
      {price}
      <Text fontSize='md' color='secondaryGray.600' fontWeight='500'>
        {details}
      </Text>
      <List spacing={3} justifyContent='flex-start'>
        {benefits.map((benefit, index) => (
          <ListItem
            key={index}
            display='flex'
            textAlign='start'
            fontSize='md'
            fontWeight='500'
            color={textColor}
            alignItems='center'
            lineHeight='100%'
            mt='30px !important'
          >
            <ListIcon
              w='10px'
              h='10px'
              as={BsCircleFill}
              my='auto'
              color={textColor}
            />
            {benefit}
          </ListItem>
        ))}{' '}
      </List>
    </Card>
  );
}
