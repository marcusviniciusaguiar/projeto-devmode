import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const usersArray: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userExists = usersArray.find((userRegistered) => userRegistered.email === email);

        if(userExists) {
            alert("Email já cadastrado anteriormente. Faça login.");
            navigate("/login");
            return;
        }

        const user: User = {
            id: Date.now(),
            name: name,
            email: email,
            password: password,
            createdAt: Date.now().toString()
        }

        const newUsersArray = JSON.stringify([...usersArray, user]);

        localStorage.setItem("users", newUsersArray);
        navigate("/login");
    }

    return (
        <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <label>Nome</label>
            <input type="text" onChange={handleName} value={name}/>
            <label>Email</label>
            <input type="email" onChange={handleEmail} value={email} />
            <label>Senha</label>
            <input type="password" onChange={handlePassword} value={password} />
            <button>Cadastrar</button>
        </form>
        </>
    )
}

export default Register;