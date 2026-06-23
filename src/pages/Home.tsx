import { Link } from "react-router-dom";
import { Button } from "../components/StyledComponents";

function Home() {
    return (
        <>
        <h1>DevHub - De Devs para Devs</h1>
        <h3>A DevHub é uma comunidade de Devs onde você pode exibir seu portfolio e fazer networking.</h3>
        <h3>Quem sabe o impulso da sua carreira começe aqui?</h3>
        <h2>Faça parte da nossa comunidade!</h2>
        <Button><Link to={"/login"}>Fazer Login</Link></Button>
        <Button><Link to={"/register"}>Registrar-se</Link></Button>
        </>
    )
}

export default Home;