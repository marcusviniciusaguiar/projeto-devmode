import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";
import { Button, Field, Form, Input } from "../components/StyledComponents";

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
        <Form onSubmit={handleSubmit}>
            <Field>
                Nome
                <Input type="text" onChange={handleName} value={name}/>
            </Field>
            <Field>
                Email
                <Input type="email" onChange={handleEmail} value={email} />
            </Field>
            <Field>
                Senha
                <Input type="password" onChange={handlePassword} value={password} />
            </Field>
            <Button>Cadastrar</Button>
        </Form>
        </>
    )
}

export default Register;