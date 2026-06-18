import { useNavigate, useParams } from "react-router-dom";
import { useProjects } from "../contexts/ProjectContext";
import ProjectForm from "../components/ProjectForm";
import type { Project } from "../types/Project";

function EditProject() {

    const { projects, updateProject } = useProjects();
    const params = useParams();
    const navigate = useNavigate();

    const project = projects.find(proj => proj.id === params.projectId);
    if(!project) return null;

    const handleUpdate = (title: string, description: string, technologies: string[]) => {
        const editedProject: Project = {
         ...project, 
         title: title,
         description: description,
         technologies: technologies
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