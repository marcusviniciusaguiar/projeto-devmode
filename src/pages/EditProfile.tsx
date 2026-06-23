import { useState, type ChangeEvent } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";
import { Button, Field, Form, Input } from "../components/StyledComponents";

function EditProfile() {

    const { user, updateProfile } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [title, setTitle] = useState(user?.title || "");
    const [photo, setPhoto] = useState(user?.photo || "");
    const [github, setGithub] = useState(user?.github || "");
    const [linkedin, setLinkedin] = useState(user?.linkedin || "");

    if(!user) return null;

    const handleName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleBio = (event: ChangeEvent<HTMLInputElement>) => {
        setBio(event.target.value);
    }

    const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }
    const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
        setPhoto(event.target.value);
    }
    const handleGithub = (event: ChangeEvent<HTMLInputElement>) => {
        setGithub(event.target.value);
    }
    const handleLinkedin = (event: ChangeEvent<HTMLInputElement>) => {
        setLinkedin(event.target.value);
    }

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {

        event.preventDefault();

        const userEdited: User = {
            ...user,
            name: name,
            bio: bio,
            title: title,
            photo: photo,
            github: github,
            linkedin: linkedin
        }

        updateProfile(userEdited);
        navigate("/dashboard");

    }

    return (
        <>
            <h1>Edição de perfil</h1>
            <Form onSubmit={handleSubmit}>
                <Field>
                    Email
                    <Input type="text" value={user.email} readOnly/>
                </Field>
                <Field>
                    Nome
                    <Input type="text" onChange={handleName} value={name} />
                </Field>
                <Field>
                    Biografia
                    <Input type="text" onChange={handleBio} value={bio} />
                </Field>
                <Field>
                    Título do perfil
                    <Input type="text" onChange={handleTitle} value={title} />
                </Field>
                <Field>
                    Foto
                    <Input type="text" onChange={handlePhoto} value={photo} />
                </Field>
                <Field>
                    GitHub
                    <Input type="text" onChange={handleGithub} value={github} />
                </Field>
                <Field>
                    LinkedIn
                    <Input type="text" onChange={handleLinkedin} value={linkedin} />
                </Field>
                <Button>Salvar alterações</Button>
            </Form>
        </>
    )
}

export default EditProfile;