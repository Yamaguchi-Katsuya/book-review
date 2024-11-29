import { createContext, useState, useEffect, ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import { getUser } from '@/api/user';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  setUserAuth: (value: boolean) => void;
  setUserName: (value: string) => void;
  setUserIconUrl: (value: string) => void;
  setIsLoading: (value: boolean) => void;
  userAuth: boolean;
  userName: string;
  userIconUrl: string;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userAuth, setUserAuth] = useState(false);
  const [userName, setUserName] = useState('');
  const [userIconUrl, setUserIconUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, , removeCookie] = useCookies();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUser = async () => {
      const token = cookies.token;
      console.log(token);

      try {
        const user = await getUser(token);

        setUserAuth(true);
        setUserName(user.name);
        setUserIconUrl(user.iconUrl);
        setIsLoading(false);
      } catch (error) {
        console.error('ユーザー情報の取得に失敗しました:', error);
        removeCookie('token');
        setUserAuth(false);
        setUserName('');
        setUserIconUrl('');
        setIsLoading(false);
        throw error;
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        userAuth,
        userName,
        userIconUrl,
        isLoading,
        setUserAuth,
        setUserName,
        setUserIconUrl,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
};
