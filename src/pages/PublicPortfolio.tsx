import { Navigate, useParams } from "react-router-dom";
import type { User } from "../types/User";
import type { Project } from "../types/Project";
import ProjectCard from "../components/ProjectCard";

function PublicPortfolio() {

    const { userId } = useParams();
    const usersArray = JSON.parse(localStorage.getItem("users") || "[]");
    const user: User = usersArray.find((u: { id: number; }) => u.id === Number(userId));

    const projectsArray = JSON.parse(localStorage.getItem("projects") || "[]");
    const projects: Project[] = projectsArray.filter((proj: Project) => proj.userId === Number(userId));

    if(!user) return <Navigate to="/" replace/>;

    return (
        <>
            <h1>{user.name}</h1>
            <h2>{user.title}</h2>
            <img src={user.photo} alt={user.name} />
            <h4>Biografia</h4>
            <p>{user.bio}</p>
            <h4>Links</h4>
            <a href={user.linkedin || ""} target="_blank" rel="noopener noreferrer">Linkedin</a>
            <a href={user.github || ""} target="_blank" rel="noopener noreferrer">GitHub</a>

            <h2>Projetos</h2>
            {
                projects.map(proj => {
                   return <ProjectCard key={proj.id} project={proj} />
                })
            }
        </>
    )
}

export default PublicPortfolio;