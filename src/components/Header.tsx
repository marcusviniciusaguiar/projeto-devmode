import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Header() {

    const { user, logout } = useAuth();

    return(
        <>
        <Link to={"/"}>Ir para a Home </Link>
        { user ? (
            <nav>
                <span>{user.name}</span>
                <Link to={"/profile/edit"}>Editar perfil</Link>
                <button onClick={() => logout()}>Sair</button>
            </nav>
            ) : (
            <nav>
                <Link to={"/login"}>Fazer login</Link>
                <Link to={"/register"}>Registrar-se</Link>
            </nav>
            )
        }
        
        </>
    )
}

export default Header;