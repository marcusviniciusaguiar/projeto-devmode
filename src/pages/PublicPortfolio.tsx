import { Navigate, useParams } from "react-router-dom";
import type { User } from "../types/User";
import type { Project } from "../types/Project";
import ProjectCard from "../components/ProjectCard";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { useProjects } from "../contexts/ProjectContext";
import { useAuth } from "../contexts/AuthContext";
import CommentsSection from "../components/CommentsSection";
import { useEffect } from "react";
import { Grid } from "../components/StyledComponents";

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xl};
`

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
`

const ProfileLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.sm};
`

const ProfileLink = styled.a`
  color: ${theme.colors.primary};
  text-decoration: none;
  &:hover { text-decoration: underline; }
`

function PublicPortfolio() {

    const { deleteProject } = useProjects();
    const { user } = useAuth();
    const { userId } = useParams();
    const usersArray = JSON.parse(localStorage.getItem("users") || "[]");
    const userOwner: User = usersArray.find((u: { id: number; }) => u.id === Number(userId));
    const isOwner = user?.id === Number(userId);

    useEffect(() => {
        if(userOwner) {
            document.title = `DevHub • ${userOwner.name}`;
        }
    }, [userOwner]);

    const projectsArray = JSON.parse(localStorage.getItem("projects") || "[]");
    const projects: Project[] = projectsArray.filter((proj: Project) => proj.userId === Number(userId));

    if(!userOwner) return <Navigate to="/" replace/>;


    return (
        <>
            <ProfileHeader>
                <Avatar src={userOwner.photo || "/user.png"} alt={userOwner.name} />
                <h1>{userOwner.name}</h1>
                <h2>{userOwner.title}</h2>
                <h4>Biografia</h4>
                <p>{userOwner.bio}</p>
                <h4>Links</h4>
                <ProfileLinks>
                    <ProfileLink href={userOwner.linkedin || ""} target="_blank" rel="noopener noreferrer">Linkedin</ProfileLink>
                    <ProfileLink href={userOwner.github || ""} target="_blank" rel="noopener noreferrer">GitHub</ProfileLink>
                </ProfileLinks>
            </ProfileHeader>

            <h2>Projetos</h2>
        
            <Grid>
                {projects.map(proj => {
                    return (
                        <ProjectCard key={proj.id} onDeleteProject={isOwner ? deleteProject : undefined} project={proj}>
                            <CommentsSection projectId={proj.id} />
                        </ProjectCard>
                    )
                })}
            </Grid>
        </>
    )
}

export default PublicPortfolio;