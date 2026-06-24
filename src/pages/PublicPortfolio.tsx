import { Navigate, useParams } from "react-router-dom";
import type { User } from "../types/User";
import type { Project } from "../types/Project";
import ProjectCard from "../components/ProjectCard";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { useProjects } from "../contexts/ProjectContext";
import { useAuth } from "../contexts/AuthContext";
import CommentsSection from "../components/CommentsSection";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.lg};
`

function PublicPortfolio() {

    const { deleteProject } = useProjects();
    const { user } = useAuth();
    const { userId } = useParams();
    const usersArray = JSON.parse(localStorage.getItem("users") || "[]");
    const userOwner: User = usersArray.find((u: { id: number; }) => u.id === Number(userId));
    const isOwner = user?.id === Number(userId);

    const projectsArray = JSON.parse(localStorage.getItem("projects") || "[]");
    const projects: Project[] = projectsArray.filter((proj: Project) => proj.userId === Number(userId));

    if(!userOwner) return <Navigate to="/" replace/>;


    return (
        <>
            <h1>{userOwner.name}</h1>
            <h2>{userOwner.title}</h2>
            <img src={userOwner.photo} alt={userOwner.name} />
            <h4>Biografia</h4>
            <p>{userOwner.bio}</p>
            <h4>Links</h4>
            <a href={userOwner.linkedin || ""} target="_blank" rel="noopener noreferrer">Linkedin</a>
            <a href={userOwner.github || ""} target="_blank" rel="noopener noreferrer">GitHub</a>

            <h2>Projetos</h2>
        
            <Grid>
                {
                    projects.map(proj => {
                            return (
                                <ProjectCard key={proj.id} onDeleteProject={isOwner ? deleteProject : undefined} project={proj}>
                                    <CommentsSection projectId={proj.id} />
                                </ProjectCard>
                            )
                    })
                }
            </Grid>
            
        </>
    )
}

export default PublicPortfolio;