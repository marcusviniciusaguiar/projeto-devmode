import { useProjects } from "../contexts/ProjectContext";
import React, { useState } from "react";

function Dashboard() {
    const { addProject } = useProjects();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [techs, setTechs] = useState("");

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleTechs = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTechs(event.target.value);
    }

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const techsArray = techs.split(",").map(word => word.trim());
        
        addProject(title, description, techsArray);

        setTitle("");
        setDescription("");
        setTechs("");
    };

    return (
        <>
            <h1>Dashboard</h1>
            <form onSubmit={handleSubmit}>
                <h3>Novo projeto</h3>
                <label>Título</label>
                <input type="text" onChange={handleTitle} value={title}/>
                <label>Descrição</label>
                <input type="text" onChange={handleDescription} value={description}/>
                <label>Tecnologias usadas</label>
                <input type="text" onChange={handleTechs} value={techs}/>
                <button>Criar projeto</button>
            </form>
        </>
    )
}

export default Dashboard;