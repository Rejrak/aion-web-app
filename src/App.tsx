import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import { UserProvider } from './context/userContext'
import DashboardLayoutBasic from './pages/Dashboard'


function App() {
  const loginPage = <LoginPage/>;

  return (
    <UserProvider>
      <Routes>
        <Route path='/auth' element={loginPage} />
        <Route path='/' element={<DashboardLayoutBasic />} />
      </Routes>
    </UserProvider>
  )
}

export default App
