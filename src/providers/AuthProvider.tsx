import { createContext, useState, useEffect, ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import { getUser } from '@/api/user';
import { GetUserApiResponse, User } from '@/types/user';

type AuthContextType = {
  setUserAuth: (value: boolean) => void;
  setUser: (user: User) => void;
  setIsLoading: (value: boolean) => void;
  userAuth: boolean;
  user: User;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userAuth, setUserAuth] = useState(false);
  const [user, setUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, , removeCookie] = useCookies();

  useEffect(() => {
    const fetchUser = async () => {
      const token = cookies.token;
      console.log(token);
      if (!token) {
        setUserAuth(false);
        setUser({} as User);
        setIsLoading(false);
        return;
      }

      try {
        const getUserResponse: GetUserApiResponse = await getUser(token);
        const user: User = {
          name: getUserResponse.name,
          iconUrl: getUserResponse.iconUrl,
        };

        setUserAuth(true);
        setUser(user);
        setIsLoading(false);
      } catch (error) {
        console.error('ユーザー情報の取得に失敗しました:', error);
        removeCookie('token');
        setUserAuth(false);
        setUser({} as User);
        setIsLoading(false);
        throw error;
      }
    };

    fetchUser();
  }, [cookies.token]);

  return (
    <AuthContext.Provider
      value={{
        userAuth,
        user,
        isLoading,
        setUserAuth,
        setUser,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
