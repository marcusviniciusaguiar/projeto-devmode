import { useEffect } from "react";
import { Link } from "react-router-dom";

function NotFound() {

    useEffect(() => {
        document.title = `DevHub • Erro 404`;
    }, []);

    return (
        <>
            <h1>404 - Página não encontrada</h1>
            <Link to="/">Voltar para a página inicial</Link>
        </>
    )
}

export default NotFound;