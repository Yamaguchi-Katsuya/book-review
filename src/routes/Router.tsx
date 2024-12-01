import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import SignUp from '@/pages/SignUp';
import Home from '@/pages/Home';
import { AuthProvider, AuthContext } from '@/providers/AuthProvider';
import { useContext } from 'react';

const AppRoutes = () => {
  const { userAuth } = useContext(AuthContext);

  return (
    <Routes>
      {userAuth ? (
        <>
          <Route path="/" element={<Home />} />
          {/* ログインしている場合はログインページやサインアップページにアクセスできないようにする */}
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/signup" element={<Navigate to="/" replace />} />
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
