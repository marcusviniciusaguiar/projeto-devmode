import type { Project } from "../types/Project";
import { Link } from "react-router-dom";

interface ProjectCardProps {
    project: Project;
    onDeleteProject?: (id: string) => void;
}

function ProjectCard({ project, onDeleteProject }: ProjectCardProps) {
    return (
        <div>
            <h2>{project.title}</h2>
            <img src={project.imageUrl} alt={project.title}/>

            {onDeleteProject ? (
                <>
                    <Link to={`/portfolio/${project.userId}`}>Visualizar projeto no perfil público</Link>
                    <Link to={`/projects/${project.id}/edit`}>Editar</Link>
                    <button onClick={() => { onDeleteProject(project.id) } }>Excluir</button>
                </>
                ) : null}

            <p>{project.description.length > 150 ? project.description.slice(0,150) + "..." : project.description}</p>
            <span>{project.status}</span>
            {project.completedDate && 
                <p>Data de conclusão: {project.completedDate}</p>
            }

            <h4>Tecnologias usadas</h4>
            <ul>
                {project.technologies.map(tech => (
                    <li key={tech}>{tech}</li>
                ))}
            </ul>
        </div>
    )
}

export default ProjectCard;