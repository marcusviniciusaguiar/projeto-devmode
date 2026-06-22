import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import AuthProvider from './contexts/AuthContext.tsx'
import ProjectProvider from './contexts/ProjectContext.tsx'
import { GlobalStyle } from './styles/GlobalStyle.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ProjectProvider>
        <GlobalStyle />
        <App />
      </ProjectProvider>
    </AuthProvider>
  </StrictMode>,
)
