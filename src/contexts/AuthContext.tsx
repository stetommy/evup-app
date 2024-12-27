import { createContext, useContext, useState } from 'react';

export interface AuthContextProps {
  user: any;
  login: (user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<any>(undefined);
// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  const login = (newUser: any) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
