import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import SignUp from '@/pages/SingUp'
import Home from '@/pages/Home'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
