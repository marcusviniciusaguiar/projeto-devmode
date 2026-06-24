import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import EditProject from './pages/EditProject'
import EditProfile from './pages/EditProfile'
import PublicPortfolio from './pages/PublicPortfolio'
import styled from 'styled-components'
import { theme } from './styles/theme'
import Favorites from './pages/Favorites'
import Discover from './pages/Discover'
import Footer from './components/Footer'
import NotFound from './pages/NotFound'

const Main = styled.main`
  max-width: 960px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
  flex: 1;
  width: 100%;
`

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

function App() {

  return (
        <BrowserRouter>
          <AppContainer>
            <Header />
            <Main>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path='/projects/:projectId/edit' element={<ProtectedRoute><EditProject /></ProtectedRoute>} />
                <Route path='/profile/edit' element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
                <Route path='/favorites' element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
                <Route path='/portfolio/:userId' element={<PublicPortfolio />} />
                <Route path='/discover' element={<Discover />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </Main>
            <Footer />
          </AppContainer>
        </BrowserRouter>
  )
}

export default App
