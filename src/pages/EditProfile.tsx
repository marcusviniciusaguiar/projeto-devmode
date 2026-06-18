import { useState, type ChangeEvent } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";

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
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="text" value={user.email} readOnly/>
                <label>Nome</label>
                <input type="text" onChange={handleName} value={name} />
                <label>Biografia</label>
                <input type="text" onChange={handleBio} value={bio} />
                <label>Título do perfil</label>
                <input type="text" onChange={handleTitle} value={title} />
                <label>Foto</label>
                <input type="text" onChange={handlePhoto} value={photo} />
                <label>GitHub</label>
                <input type="text" onChange={handleGithub} value={github} />
                <label>LinkedIn</label>
                <input type="text" onChange={handleLinkedin} value={linkedin} />
                <button>Salvar alterações</button>
            </form>
        </>
    )
}

export default EditProfile;