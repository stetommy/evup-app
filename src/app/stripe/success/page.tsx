'use client';

import { Text } from '@chakra-ui/react';
import { usePaySuccessQuery } from 'features/plans/plansAPi';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function PaymentSuccessPage({
  params,
}: {
  params: { slug: string };
}) {
  const { user } = useSelector((state: any) => state.auth);

  const { data, isSuccess } = usePaySuccessQuery(user?.email);

  const router = useRouter();

  /* console.log(data, 'ddd'); */

  useEffect(() => {
    if (isSuccess) {
      router.push('/user/dashboard');
    }
  }, [data]);
  return (
    <Text textAlign='center' mt='100px'>
      Loading.......
    </Text>
  );
}
