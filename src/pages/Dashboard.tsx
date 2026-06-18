import { useAuth } from "../contexts/AuthContext";
import { useProjects } from "../contexts/ProjectContext";
import type { Project } from "../types/Project";
import ProjectForm from "../components/ProjectForm";
import { Link } from "react-router-dom";

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

                    <div key={proj.id}>

                        <h2>{proj.title}</h2>

                        <Link to={`/projects/${proj.id}/edit`}>Editar</Link>
                        <button onClick={() => {deleteProject(proj.id)}}>Excluir</button>
                        <p>{proj.description}</p>

                        <h4>Tecnologias usadas</h4>
                        <ul>
                            {proj.technologies.map(tech => (
                                <li key={tech}>{tech}</li>
                            ))}
                        </ul>

                    </div>
                )
                })}
            </div>
                

        </>
    )
}

export default Dashboard;