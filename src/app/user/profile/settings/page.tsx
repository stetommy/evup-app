'use client';

// Chakra imports
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';

// Assets
import banner from '/public/img/auth/banner.png';
import profile from '/public/img/crm/vbz.png';

// Custom components
import Info from 'components/admin/main/profile/settings/Info';
import Password from 'components/admin/main/profile/settings/Password';
import Profile from 'components/admin/main/profile/settings/Profile';
import { useSelector } from 'react-redux';
import Plan from 'components/admin/main/profile/settings/Plan';

export default function Settings() {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, lg: 2 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        {/* Column Left */}
        <Flex direction='column'>
          <Profile
            name={`${user?.firstName} ${user?.lastName}`}
            avatar={user?.picture ? user?.picture : profile}
            banner={banner}
          />
          <Plan />
          <Password />
        </Flex>
        {/* Column Right */}
        <Flex direction='column'>
          {/* <Socials /> */}
          <Info />
        </Flex>
      </SimpleGrid>
    </Box>
  );
}
