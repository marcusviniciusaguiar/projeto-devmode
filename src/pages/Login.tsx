import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Field, Form, Input } from "../components/StyledComponents";
import { useToast } from "../contexts/ToastContext";

function Login() {

    useEffect(() => {
        document.title = "DevHub • Login";
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!email || !password) {
            showToast("Você deve preencher todos os campos para fazer login.")
            return;
        }

        const sucessLogin = login(email, password);

        if(!sucessLogin) {
            showToast("Login falhou. Verifique as credenciais e tente novamente.");
            return;
        }

        showToast("Login bem sucedido! Redirecionando...")
        setTimeout(() => navigate("/dashboard"), 1500);
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