import { useNavigate, useParams } from "react-router-dom";
import { useProjects } from "../contexts/ProjectContext";
import ProjectForm from "../components/ProjectForm";
import type { Project } from "../types/Project";
import type { ProjectFormData } from "../components/ProjectForm";
import { useEffect } from "react";

function EditProject() {

    useEffect(() => {
        document.title = "DevHub • Editar Projeto";
    }, []);

    const { projects, updateProject } = useProjects();
    const params = useParams();
    const navigate = useNavigate();

    const project = projects.find(proj => proj.id === params.projectId);
    if(!project) return null;

    const handleUpdate = (data: ProjectFormData) => {
        const editedProject: Project = {
            ...project,
            ...data
        };

        updateProject(editedProject);

        navigate("/dashboard");
    }


    return (
        <>
        <h1>Editar Projeto</h1>
        <ProjectForm project={project} onSubmit={handleUpdate}/>
        </>
    )
}

export default EditProject;