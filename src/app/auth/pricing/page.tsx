'use client';

// Chakra imports
import {
  Badge,
  Box,
  Button,
  Flex,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Image } from 'components/image/Image';

// Assets
import deloitteLogo from '/public/svg/deloitte-logo.svg';
import georgiaLogo from '/public/svg/georgia-logo.svg';
import googleLogo from '/public/svg/google-logo.svg';
import microsoftLogo from '/public/svg/microsoft-logo.svg';
import msnLogo from '/public/svg/msn-logo.svg';
import zohoLogo from '/public/svg/zoho-logo.svg';
// Custom components
import PricingLayout from '../../../components/auth/variants/PricingAuthLayout/page';
import { useState } from 'react';
import Pack from 'components/admin/main/others/pricing/Pack';
import Layout from 'app/auth/layout';
import { useGetPlansQuery } from 'features/plans/plansAPi';

function Pricing() {
  const [activeButton, setActiveButton] = useState({
    monthly: true,
    yearly: false,
  });

  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const { data: plans } = useGetPlansQuery(null);
  //console.log(plans, 'plans');
  return (
    <Layout>
      <PricingLayout
        contentTop={{ base: '140px', md: '14vh' }}
        contentBottom={{ base: '50px', lg: 'auto' }}
      >
        <Flex
          direction='column'
          alignSelf='center'
          justifySelf='center'
          overflow='hidden'
        >
          <Flex
            direction='column'
            textAlign='center'
            justifyContent='center'
            align='center'
            mb='38px'
          >
            <Text
              zIndex='1'
              fontSize='44px'
              color='white'
              fontWeight='700'
              maxW='550px'
              lineHeight='52px'
            >
              Prezzi flessibili che si adattano alle tue esigenze
            </Text>
            <Text
              zIndex='1'
              fontSize='md'
              color='white'
              fontWeight='normal'
              mt='10px'
              mb='26px'
              maxW='400px'
            >
              Consulta i nostri piani tariffari per tutti i prodotti Premium
            </Text>
            <Badge
              w='max-content'
              mb={{ base: '60px', '2xl': '30px' }}
              fontSize='sm'
              bg='rgba(255,255,255,0.12)'
              color='white'
              fontWeight='bold'
              textTransform='unset'
            >
              Carta di credito richiesta per l`&apos;`accesso
            </Badge>
            <Flex
              mb={{ base: '0px', '2xl': '80px' }}
              zIndex='2'
              bg='brand.900'
              borderRadius='60px'
              p='6px'
            >
              <Button
                variant='no-hover'
                w='135px'
                h='40px'
                fontSize='xs'
                color={activeButton.monthly ? 'brand.500' : 'white'}
                bg={activeButton.monthly ? 'white' : 'transparent'}
                onClick={() =>
                  setActiveButton({
                    monthly: true,
                    yearly: false,
                  })
                }
                borderRadius='60px'
              >
                PIANI
              </Button>
              {/* <Button
                variant='no-hover'
                w='135px'
                h='40px'
                fontSize='xs'
                color={activeButton.yearly ? 'brand.500' : 'white'}
                bg={activeButton.yearly ? 'white' : 'transparent'}
                onClick={() =>
                  setActiveButton({
                    monthly: false,
                    yearly: true,
                  })
                }
                borderRadius='60px'
              >
                ANNUALE
              </Button> */}
            </Flex>
            <Stack
              direction={{ sm: 'column', xl: 'row' }}
              alignItems='flex-end'
              spacing='20px'
              mt='40px'
              mb='160px'
            >
              {/* <Pack
                title='Freelancer'
                desc='Hit the ground running.'
                button='Start Free Trial'
                price={
                  <Text
                    textAlign='start'
                    w='100%'
                    color={textColor}
                    fontSize='40px'
                    fontWeight='bold'
                  >
                    {activeButton.monthly ? '$89' : '$159'}
                    <Text
                      as='span'
                      color='secondaryGray.600'
                      fontSize='40px'
                      fontWeight='bold'
                    >
                      {activeButton.monthly ? '/mo' : '/yr'}
                    </Text>
                  </Text>
                }
                details='(Per subscriber per month)'
                benefits={[
                  'Sell on your own terms',
                  'Website, marketing tools & automations',
                  'Bandwidth & storage is included',
                  'We’ll get you onboarded',
                ]}
              /> */}
              {plans &&
                plans.length > 0 &&
                plans.map((plan, idx) => (
                  <Pack
                    key={idx}
                    index={idx}
                    title={`${plan?.name}`}
                    desc={`${plan?.description}`}
                    button='Get started'
                    slug={`${plan?.slug}`}
                    highlighted={true}
                    price={
                      <Text
                        textAlign='start'
                        w='max-content'
                        color={textColor}
                        fontSize='40px'
                        fontWeight='bold'
                      >
                        {/* {activeButton.monthly ? plan?.price : '$259'} */}€
                        {plan?.price}
                        {/* <Text
                          as='span'
                          color='secondaryGray.600'
                          fontSize='40px'
                          fontWeight='bold'
                        >
                          {activeButton.monthly ? '/mo' : '/yr'}
                        </Text> */}
                      </Text>
                    }
                    details='(Per subscriber)'
                    benefits={plan?.includedItems}
                  />
                ))}
              {/* <Pack
                title='Big Man'
                desc='Hit the ground running.'
                button='Start Free Trial'
                price={
                  <Text
                    textAlign='start'
                    w='max-content'
                    color={textColor}
                    fontSize='40px'
                    fontWeight='bold'
                  >
                    {activeButton.monthly ? '$289' : '$359'}
                    <Text
                      as='span'
                      color='secondaryGray.600'
                      fontSize='40px'
                      fontWeight='bold'
                    >
                      {activeButton.monthly ? '/mo' : '/yr'}
                    </Text>
                  </Text>
                }
                details='(Per subscriber per month)'
                benefits={[
                  'We’ll migrate you for free',
                  'Live chat & countdowns',
                  'Bandwidth & storage is included',
                  'We’ll get you onboardedd',
                ]}
              /> */}
            </Stack>
            <Flex direction='column' mb='160px' justify='center' align='center'>
              <Text
                color={textColor}
                fontWeight='bold'
                fontSize='34px'
                mb={{ sm: '32px', xl: '16px' }}
                maxW={{ sm: '250px', md: '100%' }}
                textAlign='center'
              >
                Più di 2500 utenti utilizzano già EventsUP
              </Text>
              <SimpleGrid
                columns={{ sm: 2, md: 3, lg: 6 }}
                spacingX={{ sm: '65px', lg: '40px', xl: '65px' }}
                spacingY={{ sm: '30px' }}
              >
                <Image
                  src={googleLogo}
                  alignSelf='center'
                  justifySelf='center'
                  alt='no'
                />
                <Image
                  src={msnLogo}
                  alignSelf='center'
                  justifySelf='center'
                  alt='no'
                />
                <Image
                  src={microsoftLogo}
                  alignSelf='center'
                  justifySelf='center'
                  alt='no'
                />
                <Image
                  src={zohoLogo}
                  alignSelf='center'
                  justifySelf='center'
                  alt='no'
                />
                <Image
                  src={georgiaLogo}
                  alignSelf='center'
                  justifySelf='center'
                  alt='no'
                />
                <Image
                  src={deloitteLogo}
                  alignSelf='center'
                  justifySelf='center'
                  alt='no'
                />
              </SimpleGrid>
            </Flex>
            <Text color={textColor} fontWeight='bold' fontSize='34px' mb='60px'>
              FAQ Domande frequenti
            </Text>
            <SimpleGrid
              columns={{ md: 1, lg: 2 }}
              spacing='60px'
              maxW='1170px'
              mx='auto'
            >
              <Box>
                <Box mb='60px'>
                  <Text
                    textAlign='start'
                    color={textColor}
                    fontWeight='500'
                    fontSize='2xl'
                    mb='12px'
                  >
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit...?
                  </Text>
                  <Text
                    textAlign='start'
                    color='secondaryGray.600'
                    fontWeight='500'
                    fontSize='md'
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam dui ante, tristique sed auctor et, dictum nec metus.
                    Maecenas id lectus eget est rutrum vestibulum at eu nisl.
                    Phasellus eu sem auctor, ultrices ligula et, euismod justo.
                    Vestibulum pellentesque, magna eu sollicitudin pulvinar,
                    velit est vehicula augue, non malesuada ante nisl id turpis.
                    Fusce at est velit. In eu augue eros. Praesent et erat ac
                    nisl auctor interdum nec porta urna. Aliquam sodales
                    hendrerit dapibus.
                  </Text>
                </Box>
                <Box mb='60px'>
                  <Text
                    textAlign='start'
                    color={textColor}
                    fontWeight='500'
                    fontSize='2xl'
                    mb='12px'
                  >
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit...?
                  </Text>
                  <Text
                    textAlign='start'
                    color='secondaryGray.600'
                    fontWeight='500'
                    fontSize='md'
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam dui ante, tristique sed auctor et, dictum nec metus.
                    Maecenas id lectus eget est rutrum vestibulum at eu nisl.
                    Phasellus eu sem auctor, ultrices ligula et, euismod justo.
                    Vestibulum pellentesque, magna eu sollicitudin pulvinar,
                    velit est vehicula augue, non malesuada ante nisl id turpis.
                    Fusce at est velit. In eu augue eros. Praesent et erat ac
                    nisl auctor interdum nec porta urna. Aliquam sodales
                    hendrerit dapibus.
                  </Text>
                </Box>
                <Box mb='60px'>
                  <Text
                    textAlign='start'
                    color={textColor}
                    fontWeight='500'
                    fontSize='2xl'
                    mb='12px'
                  >
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit...?
                  </Text>
                  <Text
                    textAlign='start'
                    color='secondaryGray.600'
                    fontWeight='500'
                    fontSize='md'
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam dui ante, tristique sed auctor et, dictum nec metus.
                    Maecenas id lectus eget est rutrum vestibulum at eu nisl.
                    Phasellus eu sem auctor, ultrices ligula et, euismod justo.
                    Vestibulum pellentesque, magna eu sollicitudin pulvinar,
                    velit est vehicula augue, non malesuada ante nisl id turpis.
                    Fusce at est velit. In eu augue eros. Praesent et erat ac
                    nisl auctor interdum nec porta urna. Aliquam sodales
                    hendrerit dapibus.
                  </Text>
                </Box>
              </Box>
              <Box>
                <Box mb='60px'>
                  <Text
                    textAlign='start'
                    color={textColor}
                    fontWeight='500'
                    fontSize='2xl'
                    mb='12px'
                  >
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit...?
                  </Text>
                  <Text
                    textAlign='start'
                    color='secondaryGray.600'
                    fontWeight='500'
                    fontSize='md'
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam dui ante, tristique sed auctor et, dictum nec metus.
                    Maecenas id lectus eget est rutrum vestibulum at eu nisl.
                    Phasellus eu sem auctor, ultrices ligula et, euismod justo.
                    Vestibulum pellentesque, magna eu sollicitudin pulvinar,
                    velit est vehicula augue, non malesuada ante nisl id turpis.
                    Fusce at est velit. In eu augue eros. Praesent et erat ac
                    nisl auctor interdum nec porta urna. Aliquam sodales
                    hendrerit dapibus.
                  </Text>
                </Box>
                <Box mb='60px'>
                  <Text
                    textAlign='start'
                    color={textColor}
                    fontWeight='500'
                    fontSize='2xl'
                    mb='12px'
                  >
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit...?
                  </Text>
                  <Text
                    textAlign='start'
                    color='secondaryGray.600'
                    fontWeight='500'
                    fontSize='md'
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam dui ante, tristique sed auctor et, dictum nec metus.
                    Maecenas id lectus eget est rutrum vestibulum at eu nisl.
                    Phasellus eu sem auctor, ultrices ligula et, euismod justo.
                    Vestibulum pellentesque, magna eu sollicitudin pulvinar,
                    velit est vehicula augue, non malesuada ante nisl id turpis.
                    Fusce at est velit. In eu augue eros. Praesent et erat ac
                    nisl auctor interdum nec porta urna. Aliquam sodales
                    hendrerit dapibus.
                  </Text>
                </Box>
                <Box mb='60px'>
                  <Text
                    textAlign='start'
                    color={textColor}
                    fontWeight='500'
                    fontSize='2xl'
                    mb='12px'
                  >
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit...?
                  </Text>
                  <Text
                    textAlign='start'
                    color='secondaryGray.600'
                    fontWeight='500'
                    fontSize='md'
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam dui ante, tristique sed auctor et, dictum nec metus.
                    Maecenas id lectus eget est rutrum vestibulum at eu nisl.
                    Phasellus eu sem auctor, ultrices ligula et, euismod justo.
                    Vestibulum pellentesque, magna eu sollicitudin pulvinar,
                    velit est vehicula augue, non malesuada ante nisl id turpis.
                    Fusce at est velit. In eu augue eros. Praesent et erat ac
                    nisl auctor interdum nec porta urna. Aliquam sodales
                    hendrerit dapibus.
                  </Text>
                </Box>
              </Box>
            </SimpleGrid>
          </Flex>
        </Flex>
      </PricingLayout>
    </Layout>
  );
}

export default Pricing;
