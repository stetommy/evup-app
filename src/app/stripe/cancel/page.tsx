'use client';

import { Text } from '@chakra-ui/react';
import { usePaySuccessQuery } from 'features/plans/plansAPi';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function PaymentCancelPage({
  params,
}: {
  params: { slug: string };
}) {
  const { user } = useSelector((state: any) => state.auth);

  /* const { data, isSuccess } = usePaySuccessQuery(user?.email); */

  const router = useRouter();

  /* console.log(data, 'ddd'); */

  useEffect(() => {
    if(user) {
        if(user.isActive) {
            router.push('/user/dashboard')
        } else {
            router.push('/auth/pricing')
        } 
    }
  }, [])

  /* useEffect(() => {
    if (isSuccess) {
      router.push('/user/dashboard');
    }
  }, [data]); */
  return (
    <Text textAlign='center' mt='100px'>
      Loading.......
    </Text>
  );
}
