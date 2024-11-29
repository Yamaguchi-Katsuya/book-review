import { CookiesProvider } from 'react-cookie'
import './index.css'
import { Router } from './routes/Router'

function App() {
  return (
    <>
      <CookiesProvider>
        <Router />
      </CookiesProvider>
    </>
  )
}

export default App
