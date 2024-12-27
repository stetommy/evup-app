'use client';
//import { useAuth } from 'contexts/AuthContext';
//import { verifyToken } from 'features/middleware/utils';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';
//import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

export default function Home() {
  const router = useRouter();

  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (user) {
      router.push('/user/dashboard');
    } else {
      router.push('/auth/sign-in');
    }
  }, [user, router]);
  return <div></div>;
}
