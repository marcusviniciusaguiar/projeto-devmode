import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import EditProject from './pages/EditProject'
import EditProfile from './pages/EditProfile'

function App() {

  return (
        <BrowserRouter>
        <Header />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path='/projects/:projectId/edit' element={<ProtectedRoute><EditProject /></ProtectedRoute>} />
              <Route path='/profile/edit' element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            </Routes>
          </main>
        </BrowserRouter>
  )
}

export default App
