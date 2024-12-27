import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // if (user) {
    //   // if (user.userActive) {
    //   if (user.accessToken) {
    //     router.push('/user/dashboard');
    //   } else {
    //     router.push('/auth/main/pricing');
    //   }
    // }
  }, [user]);

  return children;
};

export default PrivateRoute;
