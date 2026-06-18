import type { Project } from "../types/Project";
import { useState } from "react";

interface ProjectFormProps {
    project?: Project;
    onSubmit: (title: string, description: string, technologies: string[]) => void;
}

function ProjectForm({project, onSubmit}: ProjectFormProps) {

    const [title, setTitle] = useState(project?.title || "");
    const [description, setDescription] = useState<string>(project?.description || "");
    const [techs, setTechs] = useState<string>(project?.technologies.join(",") || "");

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const handleTechs = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTechs(event.target.value);
    }
    
    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        
        event.preventDefault();
        const arrayTechs = techs.split(",").map(str => str.trim());
        
        onSubmit(title, description, arrayTechs);

        setTitle("");
        setDescription("");
        setTechs("");

    }

    return (
        <form onSubmit={handleSubmit}>
                <label>Título</label>
                <input type="text" onChange={handleTitle} value={title}/>
                <label>Descrição</label>
                <input type="text" onChange={handleDescription} value={description}/>
                <label>Tecnologias usadas</label>
                <input type="text" onChange={handleTechs} value={techs}/>
                <button>Salvar</button>
            </form>
    )
}

export default ProjectForm;