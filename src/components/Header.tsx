import { Link } from "react-router-dom";
function Header() {
    return(
        <>
        <Link to={"/"}>Ir para a Home </Link>
        <Link to={"/login"}>Logar no sistema</Link>
        </>
    )
}

export default Header;