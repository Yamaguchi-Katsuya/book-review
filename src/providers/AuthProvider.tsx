import { createContext, useState, useEffect, ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import { getUser } from '@/api/user';
import { GetUserApiResponse, User } from '@/types/user';
import { useLocation } from 'react-router-dom';

type AuthContextType = {
  setUserAuth: (value: boolean) => void;
  setUser: (user: User) => void;
  userAuth: boolean;
  user: User;
  isLoading: boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userAuth, setUserAuth] = useState(false);
  const [user, setUser] = useState<User>({} as User);
  const [cookies, , removeCookie] = useCookies();
  const location = useLocation();

  const logout = () => {
    removeCookie('token');
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = cookies.token;

      if (!token) {
        setUserAuth(false);
        setUser({} as User);
        setIsLoading(false);
        return;
      }

      try {
        const getUserResponse: GetUserApiResponse = await getUser(token);
        const user: User = {
          token: token,
          name: getUserResponse.name,
          iconUrl: getUserResponse.iconUrl,
        };

        setUserAuth(true);
        setUser(user);
      } catch (error) {
        console.error('ユーザー情報の取得に失敗しました:', error);
        removeCookie('token');
        setUserAuth(false);
        setUser({} as User);
        throw error;
      } finally {
        setIsLoading(true);
      }
    };

    fetchUser();
  }, [cookies.token, location.pathname]);

  return (
    <AuthContext.Provider
      value={{
        userAuth,
        user,
        isLoading,
        logout,
        setUserAuth,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
