'use client';
import React, { ReactNode, useEffect } from 'react';
import 'styles/App.css';
import 'styles/Contact.css';
import 'styles/Plugins.css';
import 'styles/MiniCalendar.css';
import { ChakraProvider } from '@chakra-ui/react';

import dynamic from 'next/dynamic';
import initialTheme from 'theme/theme';
import { useState } from 'react';
import { ConfiguratorContext } from 'contexts/ConfiguratorContext';
import { CacheProvider } from '@chakra-ui/next-js';
import { AuthProvider } from 'contexts/AuthContext';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from 'features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
//import Cookies from 'js-cookie';
import {
  //authApi,
  useGetUserInfoQuery,
  useReFreshTokenMutation,
} from 'features/auth/authApi';

/* import { AuthProvider } from '../contexts/AuthContext'; */

const _NoSSR = ({ children }) => <React.Fragment>{children}</React.Fragment>;

const NoSSR = dynamic(() => Promise.resolve(_NoSSR), {
  ssr: false,
});

export default function AppWrappers({ children }: { children: ReactNode }) {
  const [mini, setMini] = useState(false);
  const [contrast, setContrast] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [theme, setTheme] = useState(initialTheme);

  const dispatch = useDispatch();

  const {
    data: userInfo,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetUserInfoQuery(null);

  const { isRefreshTokenValid } = useSelector((state: any) => state.auth);
  const [reFreshToken] = useReFreshTokenMutation();

  const { push } = useRouter();

  useEffect(() => {
    if (isSuccess) {
      dispatch(userLoggedIn(userInfo));
      setIsAuth(true);
    }

    if (isError && (error as any)?.status === 401) {
      reFreshToken(null).then((res: any) => {
        /* console.log(res, 'reeefs'); */
        if (res?.data) {
          refetch();
        }
        if (res?.error) {
          push('/auth/sign-in');
          setIsAuth(true);
        }
      });
    }
  }, [userInfo, isError, isRefreshTokenValid]);
  return (
    <NoSSR>
      {isAuth ? (
        <ConfiguratorContext.Provider
          value={{
            mini,
            setMini,
            theme,
            setTheme,
            hovered,
            setHovered,
            contrast,
            setContrast,
          }}
        >
          <AuthProvider>
            {/* <CacheProvider> */}
              <ChakraProvider theme={theme}>{children}</ChakraProvider>
            {/* </CacheProvider> */}
          </AuthProvider>
        </ConfiguratorContext.Provider>
      ) : (
        ''
      )}
    </NoSSR>
  );
}
