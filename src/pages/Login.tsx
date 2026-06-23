import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Field, Form, Input } from "../components/StyledComponents";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const sucessLogin = login(email, password);

        if(!sucessLogin) {
            alert("Login falhou. Verifique as credenciais e tente novamente.");
            return;
        }

        navigate("/dashboard");
    }

    return (
        <>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
            <Field>
                Email
                <Input type="email" onChange={handleEmail} value={email} />
            </Field>
            <Field>
                Senha
                <Input type="password" onChange={handlePassword} value={password} />
            </Field>
            <Button>Entrar</Button>
        </Form>
        </>
    )
}

export default Login;