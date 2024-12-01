import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import SignUp from '@/pages/SignUp';
import { AuthProvider, AuthContext } from '@/providers/AuthProvider';
import { useContext } from 'react';
import BaseLayout from '@/components/BaseLayout';
import BookPublicReviewList from '@/pages/bookReview/BookPublicReviewList';
import Home from '@/pages/Home';

const AppRoutes = () => {
  const { userAuth } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route path="/" element={<Home />} />
        {userAuth ? (
          <>
            <Route path="/reviews" element={<BookPublicReviewList />} />
            {/* ログインしている場合はログインページやサインアップページにアクセスできないようにする */}
            <Route path="/login" element={<Navigate to="/reviews" replace />} />
            <Route
              path="/signup"
              element={<Navigate to="/reviews" replace />}
            />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Route>
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
