import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import AuthProvider from './contexts/AuthContext.tsx'
import ProjectProvider from './contexts/ProjectContext.tsx'
import { GlobalStyle } from './styles/GlobalStyle.tsx'
import FavoritesProvider from './contexts/FavoritesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ProjectProvider>
        <FavoritesProvider>
          <GlobalStyle />
          <App />
        </FavoritesProvider>
      </ProjectProvider>
    </AuthProvider>
  </StrictMode>,
)
