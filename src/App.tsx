import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import { UserProvider } from './context/userContext'
import DashboardLayoutBasic from './pages/Dashboard'
import { GlobalStyles } from '@mui/material'
import { TrainingPlanProvider } from './context/trainginPlanContext'

function App() {
  const loginPage = <LoginPage />;

  return (
    <UserProvider>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: "#121212",
            // fontFamily: "Arial, sans-serif",
          },
        }}
      />
      <Routes>
        <Route path='/auth' element={loginPage} />

        <Route path='/' element={
            <TrainingPlanProvider>
              <DashboardLayoutBasic />
            </TrainingPlanProvider>
        } />
      </Routes>
    </UserProvider>
  )
}

export default App
