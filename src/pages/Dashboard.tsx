import { useAuth } from "../contexts/AuthContext";
import { useProjects } from "../contexts/ProjectContext";
import type { Project } from "../types/Project";
import ProjectForm from "../components/ProjectForm";
import ProjectCard from "../components/ProjectCard";

function Dashboard() {
    const { addProject, projects, deleteProject } = useProjects();
    const { user } = useAuth();

    return (
        <>
            <h1>Dashboard</h1>
            <h3>Novo projeto</h3>
            <ProjectForm onSubmit={addProject}/>
            <h1>Meus projetos</h1>
            
            <div>
                {projects.map((proj: Project) => {
                    if (proj.userId !== user?.id) return;

                    return (
                        <ProjectCard key={proj.id} project={proj} onDeleteProject={deleteProject}/>
                    )
                })}
            </div>
                

        </>
    )
}

export default Dashboard;