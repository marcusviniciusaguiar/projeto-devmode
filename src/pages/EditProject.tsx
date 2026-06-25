import { useNavigate, useParams } from "react-router-dom";
import { useProjects } from "../contexts/ProjectContext";
import ProjectForm from "../components/ProjectForm";
import type { Project } from "../types/Project";
import type { ProjectFormData } from "../components/ProjectForm";
import { useEffect } from "react";
import { useToast } from "../contexts/ToastContext";

function EditProject() {

    useEffect(() => {
        document.title = "DevHub • Editar Projeto";
    }, []);

    const { projects, updateProject } = useProjects();
    const params = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const project = projects.find(proj => proj.id === params.projectId);
    if(!project) return null;

    const handleUpdate = (data: ProjectFormData) => {
        const editedProject: Project = {
            ...project,
            ...data
        };

        updateProject(editedProject);

        showToast("Projeto editado com sucesso! Redirecionando...")
        setTimeout(() => navigate("/dashboard"), 1500);
    }


    return (
        <>
        <h1>Editar Projeto</h1>
        <ProjectForm project={project} onSubmit={handleUpdate}/>
        </>
    )
}

export default EditProject;