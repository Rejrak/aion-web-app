import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import LoginPage from './pages/Login'
import { UserProvider } from './context/userContext'


function App() {
  const location = useLocation();

  const homePage = <Home />;
  const loginPage = <LoginPage onClick={ () => alert("Yeee callback")}/>;

  return (
    <UserProvider>
      {location.pathname !== '/auth' && <NavBar />}
      <Routes>
        <Route path='/auth' element={loginPage} />
        <Route path='/' element={homePage} />
      </Routes>
    </UserProvider>
  )
}

export default App
