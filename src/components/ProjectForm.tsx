import type { Project } from "../types/Project";
import { useState } from "react";
import { Button, Field, Form, Input, Select } from "./StyledComponents";
import { useToast } from "../contexts/ToastContext";

export interface ProjectFormData {
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string;
    githubUrl?: string;
    liveUrl?: string;
    completedDate?: string;
    status: "Em Progresso" | "Concluído" | "Planejado";
}

interface ProjectFormProps {
    project?: Project;
    onSubmit: (data: ProjectFormData) => void;
}

function ProjectForm({project, onSubmit}: ProjectFormProps) {

    const { showToast } = useToast();

    const [title, setTitle] = useState(project?.title || "");
    const [description, setDescription] = useState<string>(project?.description || "");
    const [techs, setTechs] = useState<string>(project?.technologies.join(",") || "");
    const [imageUrl, setImage] = useState<string>(project?.imageUrl || "");
    const [githubUrl, setGithub] = useState<string>(project?.githubUrl || "");
    const [liveUrl, setLiveUrl] = useState<string>(project?.liveUrl || "");
    const [completedDate, setCompletedDate] = useState<string>(project?.completedDate || "");
    const [status, setStatus] = useState<Project["status"]>(project?.status || "Planejado");


    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const handleTechs = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTechs(event.target.value);
    }

    const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(event.target.value);
    }

    const handleGithub = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGithub(event.target.value);
    }

    const handleLiveUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLiveUrl(event.target.value);
    }

    const handleCompletedDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCompletedDate(event.target.value);
    }
    
    const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = (event.target.value);
        if(value === "Planejado" || value === "Em Progresso" || value === "Concluído") {
            setStatus(value);
        }
    }
    
    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        
        event.preventDefault();
        const arrayTechs = techs.split(",").map(str => str.trim());

        if(!title || !description || !techs || !imageUrl) {
            showToast("Todos os campos obrigatórios devem estar preenchidos");
            return;
        }

        if(title.length > 100) {
            showToast("O título deve ter no máximo 100 caracteres");
            return;
        }

        if(description.length > 500) {
            showToast("A descrição deve ter no máximo 500 caracteres");
            return;
        }

        
        if(imageUrl && (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://"))) {
            showToast('O link da foto deve começar com "http" ou "https"');
            return;
        }

        if(githubUrl && (!githubUrl.startsWith("http://") && !githubUrl.startsWith("https://"))) {
            showToast('O link do GitHub deve começar com "http" ou "https"');
            return;
        }

        if(liveUrl && (!liveUrl.startsWith("http://") && !liveUrl.startsWith("https://"))) {
            showToast('A URL do projeto deve começar com "http" ou "https"');
            return;
        }


        onSubmit({title, description, technologies: arrayTechs, imageUrl, githubUrl, liveUrl, completedDate, status});

        setTitle("");
        setDescription("");
        setTechs("");
        setImage("");
        setGithub("");
        setLiveUrl("");
        setCompletedDate("");
        setStatus("Planejado");

        showToast("")
    }

    return (
        <Form onSubmit={handleSubmit}>
                <Field>
                    Título
                    <Input type="text" onChange={handleTitle} value={title}/>
                </Field>
                <Field>
                    Descrição
                    <Input type="text" onChange={handleDescription} value={description}/>
                </Field>
                <Field>
                    Tecnologias usadas
                    <Input type="text" onChange={handleTechs} value={techs}/>
                </Field>
                <Field>
                    Imagem
                    <Input type="text" onChange={handleImage} value={imageUrl}/>
                </Field>
                <Field>
                    Link do repositório do GitHub
                    <Input type="text" onChange={handleGithub} value={githubUrl}/>
                </Field>
                <Field>
                    Live URL do projeto
                    <Input type="text" onChange={handleLiveUrl} value={liveUrl}/>
                </Field>
                <Field>
                    Data de conclusão
                    <Input type="date" onChange={handleCompletedDate} value={completedDate}/>
                </Field>
                <Field>
                    Status do projeto
                    <Select value={status} onChange={handleStatus}>
                        <option value="Concluído">Concluído</option>
                        <option value="Em Progresso">Em Progresso</option>
                        <option value="Planejado">Planejado</option>
                    </Select>
                </Field>
                <Button>Salvar</Button>
            </Form>
    )
}

export default ProjectForm;