import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import SignUp from '@/pages/SignUp';
import Home from '@/pages/Home';
import { AuthProvider, AuthContext } from '@/providers/AuthProvider';
import { useContext } from 'react';
import Loading from '@/pages/Loading';

const AppRoutes = () => {
  const { userAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loading />; // ローディング中の画面を表示
  }

  return (
    <Routes>
      {userAuth ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
};

export const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};
