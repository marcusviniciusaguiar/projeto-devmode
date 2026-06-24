import { Link, Navigate } from "react-router-dom";
import { theme } from "../styles/theme";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xl} 0;
  min-height: 100%;
  justify-content: center;
`

const Actions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`

const RegisterLink = styled(Link)`
  background: ${theme.colors.primary};
  color: ${theme.colors.text};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
`

const LoginLink = styled(Link)`
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: 6px;
  text-decoration: none;
`


function Home() {
  
  useEffect(() => {
    document.title = "DevHub";
  }, []);

  const { user } = useAuth();

  if(user) {
    return <Navigate to={"/discover"}/>
  }
    return (
        <Hero>
            <h1>DevHub - A sua plataforma de portfólios Dev</h1>
            <p>A DevHub é uma comunidade de Devs onde você pode exibir seu portfolio e fazer networking. 
                Quem sabe o impulso da sua carreira começe aqui?</p>
            <h2>Faça parte da nossa comunidade!</h2>
            <Actions>
                <RegisterLink to={"/register"}>Registrar-se</RegisterLink>
                <LoginLink to={"/login"}>Fazer Login</LoginLink>
            </Actions>
        </Hero>
    )
}

export default Home;