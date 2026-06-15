import React, { useState } from "react";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" onChange={handleEmail} value={email} />
            <label>Senha</label>
            <input type="password" onChange={handlePassword} value={password} />
            <button>Entrar</button>
        </form>
        </>
    )
}

export default Login;