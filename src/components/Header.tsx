import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styled from "styled-components";
import { theme } from "../styles/theme";

const PageHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.surface};
`
const Logo = styled(Link)`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${theme.colors.text};
  text-decoration: none;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`

const NavLink = styled(Link)`
  color: ${theme.colors.text};
  text-decoration: none;
  &:hover { text-decoration: underline; }
`

const LogoutButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.text};
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 6px;
  cursor: pointer;
  transition: filter 0.2s;
  &:hover { filter: brightness(1.2); }
`

function Header() {

    const { user, logout } = useAuth();

    return(
        <PageHeader>
            <Logo to={"/"}>DevHub</Logo>
            { user ? (
                <Navbar>
                    <NavLink to={`/portfolio/${user.id}`}>{user.name}</NavLink>
                    <NavLink to={"/dashboard"}>Dashboard</NavLink>
                    <NavLink to={"/favorites"}>Favoritos</NavLink>
                    <NavLink to={"/profile/edit"}>Editar perfil</NavLink>
                    <LogoutButton onClick={() => logout()}>Sair</LogoutButton>
                </Navbar>
                ) : (
                <Navbar>
                    <NavLink to={"/login"}>Fazer login</NavLink>
                    <NavLink to={"/register"}>Registrar-se</NavLink>
                </Navbar>
                )
            }
        </PageHeader>
    )
}

export default Header;