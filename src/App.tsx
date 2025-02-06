import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import { UserProvider } from './context/userContext'
import DashboardLayoutBasic from './pages/Dashboard'
import { CustomThemeProvider } from './context/ThemeContext'
import { styled } from 'styled-components'

const AppContainer = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
`;

function App() {
  
  const loginPage = <LoginPage />;

  return (
    <CustomThemeProvider>
      <AppContainer>
        <UserProvider>
          <Routes>
            <Route path='/auth' element={loginPage} />
            <Route path='/' element={<DashboardLayoutBasic />} />
          </Routes>
        </UserProvider>
      </AppContainer>
    </CustomThemeProvider>
  )
}

export default App
