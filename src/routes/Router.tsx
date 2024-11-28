import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
